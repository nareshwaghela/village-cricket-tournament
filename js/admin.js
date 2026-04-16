// js/scoring.js - Complete Live Scoring System

// Global Variables
let currentMatchId = null;
let currentMatch = null;
let matchState = {
    currentInnings: 1,
    battingTeam: null,
    bowlingTeam: null,
    currentOver: 0,
    currentBall: 0,
    ballsInOver: [],
    striker: null,
    nonStriker: null,
    currentBowler: null,
    bowlerOvers: {},
    team1Score: { runs: 0, wickets: 0, overs: 0 },
    team2Score: { runs: 0, wickets: 0, overs: 0 },
    batsmenStats: {},
    bowlerStats: {},
    fallOfWickets: [],
    eventLog: []
};

// Initialize Scoreboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('⚡ Scoring System Initialized');
    
    // Get match ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    currentMatchId = urlParams.get('id');
    
    if (currentMatchId) {
        loadMatchData(currentMatchId);
        setupRealtimeListener();
    } else {
        showError('No match ID provided');
    }
});

// Load Match Data
async function loadMatchData(matchId) {
    try {
        showLoading(true);
        
        const docRef = db.collection('matches').doc(matchId);
        const doc = await docRef.get();
        
        if (!doc.exists) {
            throw new Error('Match not found');
        }
        
        currentMatch = { id: doc.id, ...doc.data() };
        
        // Initialize or restore state
        if (currentMatch.matchState) {
            matchState = currentMatch.matchState;
        } else {
            initializeNewMatch();
        }
        
        // Update UI
        updateMatchHeader();
        updateScoreDisplay();
        updatePlayersInfo();
        updateThisOver();
        updateEventLog();
        
        // Show controls if match is live
        if (currentMatch.status === 'live') {
            document.getElementById('scoring-controls').style.display = 'block';
            document.getElementById('admin-link').style.display = 'inline';
            populateWicketModalSelects();
        } else if (currentMatch.status === 'completed') {
            showMatchResult();
        }
        
        showLoading(false);
        
    } catch (error) {
        console.error('Error loading match:', error);
        showError('Error loading match data: ' + error.message);
    }
}

// Initialize New Match State
function initializeNewMatch() {
    matchState = {
        currentInnings: 1,
        battingTeam: currentMatch.team1Id,
        bowlingTeam: currentMatch.team2Id,
        currentOver: 0,
        currentBall: 0,
        ballsInOver: [],
        striker: null,
        nonStriker: null,
        currentBowler: null,
        bowlerOvers: {},
        team1Score: { runs: 0, wickets: 0, overs: 0 },
        team2Score: { runs: 0, wickets: 0, overs: 0 },
        batsmenStats: {},
        bowlerStats: {},
        fallOfWickets: [],
        eventLog: [{ time: new Date(), text: 'Match started!' }]
    };
    
    saveMatchState();
}

// Setup Realtime Listener
function setupRealtimeListener() {
    db.collection('matches').doc(currentMatchId)
        .onSnapshot(doc => {
            if (doc.exists && doc.data().matchState) {
                matchState = doc.data().matchState;
                updateAllDisplays();
            }
        });
}

// ==================== SCORING FUNCTIONS ====================

// Add Runs
async function addRuns(runs) {
    try {
        // Update score
        if (matchState.currentInnings === 1) {
            matchState.team1Score.runs += runs;
        } else {
            matchState.team2Score.runs += runs;
        }
        
        // Update striker stats
        if (matchState.striker) {
            if (!matchState.batsmenStats[matchState.striker]) {
                matchState.batsmenStats[matchState.striker] = { runs: 0, balls: 0, fours: 0, sixes: 0 };
            }
            matchState.batsmenStats[matchState.striker].runs += runs;
            matchState.batsmenStats[matchState.striker].balls += 1;
            
            if (runs === 4) matchState.batsmenStats[matchState.striker].fours++;
            if (runs === 6) matchState.batsmenStats[matchState.striker].sixes++;
        }
        
        // Update bowler stats
        updateBowlerStats(runs);
        
        // Record ball
        recordBall(`run-${runs}`);
        
        // Switch strike for odd runs
        if (runs % 2 !== 0) {
            switchStrike();
        }
        
        // Increment ball
        incrementBall();
        
        addEventLog(`${runs} run(s) scored`);
        await saveMatchState();
        updateAllDisplays();
        
    } catch (error) {
        console.error('Error adding runs:', error);
        showToast('Error updating score', 'error');
    }
}

// Add Wide Ball
async function addWide() {
    try {
        if (matchState.currentInnings === 1) {
            matchState.team1Score.runs += 1; // Wide + 1
        } else {
            matchState.team2Score.runs += 1;
        }
        
        // Update bowler stats (wide doesn't count as legal ball)
        if (matchState.currentBowler) {
            if (!matchState.bowlerStats[matchState.currentBowler]) {
                matchState.bowlerStats[matchState.currentBowler] = { 
                    overs: 0, maidens: 0, runs: 0, wickets: 0 
                };
            }
            matchState.bowlerStats[matchState.currentBowler].runs += 1;
        }
        
        recordBall('wide');
        addEventLog('Wide ball! +1 run');
        await saveMatchState();
        updateAllDisplays();
        
    } catch (error) {
        console.error('Error adding wide:', error);
    }
}

// Add No Ball
async function addNoBall() {
    try {
        if (matchState.currentInnings === 1) {
            matchState.team1Score.runs += 1;
        } else {
            matchState.team2Score.runs += 1;
        }
        
        // Update bowler stats
        if (matchState.currentBowler) {
            if (!matchState.bowlerStats[matchState.currentBowler]) {
                matchState.bowlerStats[matchState.currentBowler] = { 
                    overs: 0, maidens: 0, runs: 0, wickets: 0 
                };
            }
            matchState.bowlerStats[matchState.currentBowler].runs += 1;
        }
        
        recordBall('noball');
        addEventLog('No ball! Free hit +1 run');
        await saveMatchState();
        updateAllDisplays();
        
    } catch (error) {
        console.error('Error adding no ball:', error);
    }
}

// Add Byes/Leg Byes
async function addByes(runs) {
    try {
        if (matchState.currentInnings === 1) {
            matchState.team1Score.runs += runs;
        } else {
            matchState.team2Score.runs += runs;
        }
        
        recordBall(`byes-${runs}`);
        incrementBall();
        
        if (runs % 2 !== 0) switchStrike();
        
        addEventLog(`${runs} bye(s)`);
        await saveMatchState();
        updateAllDisplays();
        
    } catch (error) {
        console.error('Error adding byes:', error);
    }
}

async function addLegByes(runs) {
    try {
        if (matchState.currentInnings === 1) {
            matchState.team1Score.runs += runs;
        } else {
            matchState.team2Score.runs += runs;
        }
        
        recordBall(`legbyes-${runs}`);
        incrementBall();
        
        if (runs % 2 !== 0) switchStrike();
        
        addEventLog(`${runs} leg bye(s)`);
        await saveMatchState();
        updateAllDisplays();
        
    } catch (error) {
        console.error('Error adding leg byes:', error);
    }
}

// Wicket Functions
function showWicketModal() {
    document.getElementById('wicket-modal').style.display = 'flex';
}

function closeWicketModal() {
    document.getElementById('wicket-modal').style.display = 'none';
}

async function confirmWicket() {
    try {
        const outBatsman = document.getElementById('out-batsman-select').value;
        const dismissalType = document.getElementById('dismissal-type').value;
        const newBatsman = document.getElementById('new-batsman-select').value;
        
        // Update wicket count
        if (matchState.currentInnings === 1) {
            matchState.team1Score.wickets += 1;
        } else {
            matchState.team2Score.wickets += 1;
        }
        
        // Record fall of wicket
        const currentScore = matchState.currentInnings === 1 ? 
            `${matchState.team1Score.runs}/${matchState.team1Score.wickets}` :
            `${matchState.team2Score.runs}/${matchState.team2Score.wickets}`;
        
        matchState.fallOfWickets.push({
            batsman: outBatsman,
            score: currentScore,
            over: `${matchState.currentOver}.${matchState.currentBall}`,
            dismissalType: dismissalType
        });
        
        // Update bowler stats
        if (matchState.currentBowler) {
            if (!matchState.bowlerStats[matchState.currentBowler]) {
                matchState.bowlerStats[matchState.currentBowler] = { 
                    overs: 0, maidens: 0, runs: 0, wickets: 0 
                };
            }
            matchState.bowlerStats[matchState.currentBowler].wickets += 1;
        }
        
        // Replace batsman
        if (outBatsman === matchState.striker) {
            matchState.striker = newBatsman;
        } else {
            matchState.nonStriker = newBatsman;
        }
        
        recordBall('wicket');
        incrementBall();
        
        addEventLog(`WICKET! ${outBatsman} ${dismissalType}`);
        closeWicketModal();
        
        await saveMatchState();
        updateAllDisplays();
        
        // Check if all out
        checkInningsComplete();
        
    } catch (error) {
        console.error('Error recording wicket:', error);
        showToast('Error recording wicket', 'error');
    }
}

// Over & Innings Management
async function completeOver() {
    try {
        matchState.currentOver += 1;
        matchState.currentBall = 0;
        matchState.ballsInOver = [];
        
        // Switch strike at end of over
        switchStrike();
        
        // Change bowler (you can implement bowler selection UI)
        addEventLog(`Over ${matchState.currentOver} completed`);
        
        await saveMatchState();
        updateAllDisplays();
        
    } catch (error) {
        console.error('Error completing over:', error);
    }
}

async function endInnings() {
    if (!confirm('End this innings?')) return;
    
    try {
        if (matchState.currentInnings === 1) {
            matchState.currentInnings = 2;
            // Reset for second innings
            matchState.battingTeam = currentMatch.team2Id;
            matchState.bowlingTeam = currentMatch.team1Id;
            matchState.currentOver = 0;
            matchState.currentBall = 0;
            matchState.ballsInOver = [];
            matchState.striker = null;
            matchState.nonStriker = null;
            matchState.currentBowler = null;
            
            addEventLog('=== INNINGS BREAK ===');
            addEventLog(`Target: ${matchState.team1Score.runs + 1} runs to win`);
        } else {
            // Match completed - determine winner
            await finalizeMatch();
        }
        
        await saveMatchState();
        updateAllDisplays();
        
    } catch (error) {
        console.error('Error ending innings:', error);
    }
}

async function finalizeMatch() {
    const team1Runs = matchState.team1Score.runs;
    const team2Runs = matchState.team2Score.runs;
    
    let result = '';
    let winnerId = null;
    
    if (team1Runs > team2Runs) {
        winnerId = currentMatch.team1Id;
        const margin = team1Runs - team2Runs;
        result = `${getTeamName(currentMatch.team1Id)} won by ${margin} runs`;
    } else if (team2Runs > team1Runs) {
        winnerId = currentMatch.team2Id;
        const wicketsLeft = 10 - matchState.team2Score.wickets;
        result = `${getTeamName(currentMatch.team2Id)} won by ${wicketsLeft} wicket(s)`;
    } else {
        result = 'Match Tied';
    }
    
    await db.collection('matches').doc(currentMatchId).update({
        status: 'completed',
        result: result,
        winnerId: winnerId,
        team1Score: matchState.team1Score,
        team2Score: matchState.team2Score,
        matchState: matchState,
        endTime: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    showMatchResult(result, winnerId);
}

// Utility Functions
function switchStrike() {
    const temp = matchState.striker;
    matchState.striker = matchState.nonStriker;
    matchState.nonStriker = temp;
}

function incrementBall() {
    matchState.currentBall += 1;
    
    if (matchState.currentBall >= 6) {
        // Auto-complete over after short delay
        setTimeout(() => {
            if (confirm('Over complete! Start next over?')) {
                completeOver();
            }
        }, 500);
    }
}

function recordBall(type) {
    matchState.ballsInOver.push({ ball: matchState.currentBall, type: type });
}

function updateBowlerStats(runs) {
    if (matchState.currentBowler) {
        if (!matchState.bowlerStats[matchState.currentBowler]) {
            matchState.bowlerStats[matchState.currentBowler] = { 
                overs: 0, maidens: 0, runs: 0, wickets: 0 
            };
        }
        matchState.bowlerStats[matchState.currentBowler].runs += runs;
    }
}

async function undoLastBall() {
    if (!confirm('Undo last ball?')) return;
    
    // Implement undo logic here
    showToast('Undo functionality - implement based on requirements');
}

function checkInningsComplete() {
    const maxWickets = 10; // Adjust based on tournament settings
    
    if (matchState.currentInnings === 1 && matchState.team1Score.wickets >= maxWickets) {
        setTimeout(() => {
            if (confirm('All Out! End innings?')) {
                endInnings();
            }
        }, 1000);
    } else if (matchState.currentInnings === 2 && matchState.team2Score.wickets >= maxWickets) {
        setTimeout(() => {
            endInnings();
        }, 1000);
    }
}

// ==================== UI UPDATE FUNCTIONS ====================

function updateAllDisplays() {
    updateScoreDisplay();
    updatePlayersInfo();
    updateThisOver();
    updateEventLog();
}

function updateMatchHeader() {
    const team1Name = getTeamName(currentMatch.team1Id);
    const team2Name = getTeamName(currentMatch.team2Id);
    
    document.getElementById('match-header').innerHTML = `
        <h1>${team1Name} vs ${team2Name}</h1>
        <div class="match-meta">
            📅 ${formatDate(currentMatch.dateTime)} | 📍 ${currentMatch.venue || 'Village Ground'}
            | ⚡ ${currentMatch.status.toUpperCase()}
        </div>
    `;
}

function updateScoreDisplay() {
    // Team 1 Score
    document.getElementById('team1-name').textContent = getTeamName(currentMatch.team1Id);
    document.getElementById('team1-runs').textContent = matchState.team1Score.runs;
    document.getElementById('team1-wickets').textContent = matchState.team1Score.wickets;
    document.getElementById('team1-overs').textContent = formatOvers(matchState.team1Score.overs || matchState.currentOver);
    
    // Calculate Run Rate Team 1
    const rr1 = calculateRunRate(matchState.team1Score.runs, matchState.currentOver);
    document.getElementById('team1-rr').textContent = `RR: ${rr1.toFixed(2)}`;
    
    // Team 2 Score
    document.getElementById('team2-name').textContent = getTeamName(currentMatch.team2Id);
    document.getElementById('team2-runs').textContent = matchState.team2Score.runs;
    document.getElementById('team2-wickets').textContent = matchState.team2Score.wickets;
    document.getElementById('team2-overs').textContent = formatOvers(matchState.team2Score.overs || 0);
    
    // Calculate Run Rate Team 2
    const rr2 = calculateRunRate(matchState.team2Score.runs, matchState.currentOver);
    document.getElementById('team2-rr').textContent = `RR: ${rr2.toFixed(2)}`;
    
    // Update status badge
    const statusBadge = document.getElementById('match-status-live');
    statusBadge.textContent = currentMatch.status.toUpperCase();
    if (currentMatch.status === 'live') {
        statusBadge.style.backgroundColor = '#dc3545';
    }
}

function updatePlayersInfo() {
    // Striker & Non-Striker
    document.getElementById('striker-name').textContent = getPlayerName(matchState.striker) || '-';
    document.getElementById('non-striker-name').textContent = getPlayerName(matchState.nonStriker) || '-';
    
    // Batsman Stats
    const strikerStats = matchState.batsmenStats[matchState.striker];
    const nonStrikerStats = matchState.batsmenStats[matchState.nonStriker];
    
    document.getElementById('striker-stats').textContent = 
        strikerStats ? `${strikerStats.runs}(${strikerStats.balls})` : '0(0)';
    document.getElementById('non-striker-stats').textContent = 
        nonStrikerStats ? `${nonStrikerStats.runs}(${nonStrikerStats.balls})` : '0(0)';
    
    // Bowler Info
    document.getElementById('bowler-name').textContent = getPlayerName(matchState.currentBowler) || '-';
    const bowlerStats = matchState.bowlerStats[matchState.currentBowler];
    document.getElementById('bowler-stats').textContent = 
        bowlerStats ? `${bowlerStats.overs} ov | ${bowlerStats.runs} runs | ${bowlerStats.wickets} wkts` : '- ov | - runs | - wkts';
}

function updateThisOver() {
    const container = document.getElementById('this-over-balls');
    
    let html = '';
    for (let i = 0; i < 6; i++) {
        const ball = matchState.ballsInOver[i];
        let className = 'ball-dot';
        let display = '-';
        
        if (ball) {
            className += ' ' + ball.type;
            if (ball.type.startsWith('run-')) {
                display = ball.type.replace('run-', '');
            } else if (ball.type === 'wicket') {
                display = 'W';
            } else if (ball.type === 'wide') {
                display = 'Wd';
            } else if (ball.type === 'noball') {
                display = 'Nb';
            } else if (ball.type.startsWith('byes')) {
                display = 'B';
            } else if (ball.type.startsWith('legbyes')) {
                display = 'Lb';
            }
        }
        
        html += `<span class="${className}">${display}</span>`;
    }
    
    container.innerHTML = html;
}

function updateEventLog() {
    const container = document.getElementById('event-log');
    
    const logEntries = matchState.eventLog.slice(-20).reverse(); // Last 20 events
    
    container.innerHTML = logEntries.map(entry => `
        <p class="log-entry">
            <span class="over-label">${formatTime(entry.time)}</span>
            ${entry.text}
        </p>
    `).join('');
}

function showMatchResult(result, winnerId) {
    document.getElementById('scoring-controls').style.display = 'none';
    document.getElementById('match-result').style.display = 'block';
    
    document.getElementById('result-text').textContent = result || currentMatch.result;
    document.getElementById('winner-text').textContent = winnerId ? 
        `🏆 Winner: ${getTeamName(winnerId)}` : '';
}

// ==================== HELPER FUNCTIONS ====================

async function saveMatchState() {
    await db.collection('matches').doc(currentMatchId).update({
        matchState: matchState,
        team1Score: matchState.team1Score,
        team2Score: matchState.team2Score,
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    });
}

function getTeamName(teamId) {
    // This would typically fetch from teams collection
    return teamId === currentMatch.team1Id ? 'Team 1' : 'Team 2';
}

function getPlayerName(playerId) {
    return playerId || null;
}

function formatDate(timestamp) {
    if (!timestamp) return 'TBA';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('hi-IN', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatTime(timestamp) {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' });
}

function formatOvers(overs) {
    if (!overs && overs !== 0) return '0.0';
    return overs.toFixed(1);
}

function calculateRunRate(runs, overs) {
    if (!overs || overs === 0) return 0.00;
    return runs / overs;
}

function populateWicketModalSelects() {
    // Populate with actual players from database
    const outSelect = document.getElementById('out-batsman-select');
    const newSelect = document.getElementById('new-batsman-select');
    
    // Placeholder - replace with actual player data
    outSelect.innerHTML = '<option value="batsman1">Batsman 1</option>';
    newSelect.innerHTML = '<option value="new-batsman">New Batsman</option>';
}

function showLoading(show) {
    document.getElementById('loading-overlay').style.display = show ? 'flex' : 'none';
}

function showError(message) {
    alert('❌ Error: ' + message);
    showLoading(false);
}

function showToast(message, type = 'success') {
    // Simple toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === 'error' ? '#dc3545' : '#28a745'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 9999;
        font-weight: 500;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
}

// Export functions
window.ScoringApp = {
    addRuns,
    addWide,
    addNoBall,
    addByes,
    addLegByes,
    showWicketModal,
    closeWicketModal,
    confirmWicket,
    completeOver,
    endInnings,
    undoLastBall,
    switchStrike
};
