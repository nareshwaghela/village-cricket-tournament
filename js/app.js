/* css/scoreboard.css - Live Scoreboard Styles */

.scoreboard-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
    min-height: calc(100vh - 70px);
}

/* Match Header */
.match-header {
    background: linear-gradient(135deg, #1a5f2a, #2d8a3e);
    color: white;
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
    margin-bottom: 2rem;
    box-shadow: 0 4px 15px rgba(26,95,42,0.3);
}

.match-header h1 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
}

.match-meta {
    font-size: 1rem;
    opacity: 0.9;
}

/* Live Score Section */
.live-score-section {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
}

.scoreboard-main {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 2rem;
    align-items: center;
    margin-bottom: 2rem;
}

.team-score-card {
    text-align: center;
    padding: 2rem;
    border-radius: 12px;
    transition: all 0.3s ease;
}

.batting-team {
    background: linear-gradient(135deg, rgba(26,95,42,0.1), rgba(45,138,62,0.05));
    border: 3px solid var(--primary-color);
}

.bowling-team {
    background: #f8f9fa;
    border: 2px solid #e0e0e0;
}

.team-name-display {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.score-display {
    font-size: 4rem;
    font-weight: bold;
    line-height: 1;
    margin-bottom: 0.5rem;
}

.score-display .runs {
    color: var(--text-dark);
}

.score-display .wickets {
    color: #dc3545;
}

.separator {
    color: #6c757d;
    margin: 0 0.5rem;
}

.overs-display {
    font-size: 1.3rem;
    color: var(--text-light);
    margin-bottom: 0.5rem;
}

.run-rate {
    font-size: 1.1rem;
    color: var(--secondary-color);
    font-weight: 600;
}

.vs-divider {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.vs-badge-large {
    background-color: var(--accent-color);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 50%;
    font-weight: bold;
    font-size: 1.3rem;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.match-status-badge {
    background-color: #dc3545;
    color: white;
    padding: 0.5rem 1.5rem;
    border-radius: 20px;
    font-weight: bold;
    animation: pulse 2s infinite;
    font-size: 0.9rem;
}

@keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
}

/* Players Info Bar */
.players-info-bar {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 12px;
    margin-bottom: 1.5rem;
}

.batsman-info h4,
.bowler-info h4 {
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-size: 1rem;
    text-transform: uppercase;
}

.batsmen-row {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}

.batsman,
.bowler-current {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem;
    background: white;
    border-radius: 8px;
}

.player-name {
    font-weight: bold;
    min-width: 120px;
    color: var(--text-dark);
}

.player-stats {
    color: var(--text-light);
    font-size: 0.95rem;
}

.badge-on-strike {
    background-color: var(--accent-color);
    color: white;
    padding: 0.2rem 0.6rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: bold;
}

/* This Over Display */
.this-over-section {
    background: linear-gradient(135deg, rgba(255,193,7,0.1), rgba(255,152,0,0.05));
    border: 2px dashed #ffc107;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
}

.this-over-section h4 {
    color: #f57c00;
    margin-bottom: 1rem;
}

.balls-display {
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    flex-wrap: wrap;
}

.ball-dot {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    color: transparent;
}

.ball-dot.run-0 { background-color: #9e9e9e; color: white; }
.ball-dot.run-1,
.ball-dot.run-2,
.ball-dot.run-3 { background-color: #2196f3; color: white; }
.ball-dot.run-4 { background-color: #4caf50; color: white; }
.ball-dot.run-6 { background-color: #ff9800; color: white; }
.ball-dot.wide,
.ball-dot.noball { background-color: #9c27b0; color: white; }
.ball-dot.wicket { background-color: #f44336; color: white; }

/* Scoring Controls */
.scoring-controls-section {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
    border-top: 4px solid var(--primary-color);
}

.scoring-controls-section h3 {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
}

.runs-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.score-btn {
    padding: 1.5rem 1rem;
    border: none;
    border-radius: 12px;
    font-size: 2rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    color: white;
}

.score-btn:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 6px 20px rgba(0,0,0,0.2);
}

.dot-ball { background: linear-gradient(135deg, #9e9e9e, #757575); }
.single { background: linear-gradient(135deg, #2196f3, #1976d2); }
.double { background: linear-gradient(135deg, #03a9f4, #0288d1); }
.three { background: linear-gradient(135deg, #00bcd4, #0097a7); }
.four { background: linear-gradient(135deg, #4caf50, #388e3c); }
.six { background: linear-gradient(135deg, #ff9800, #f57c00); }

.extras-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.btn-extra {
    padding: 1rem;
    border: 2px solid;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    background: white;
}

.wide-btn { border-color: #9c27b0; color: #9c27b0; }
.noball-btn { border-color: #e91e63; color: #e91e63; }
.byes-btn { border-color: #00bcd4; color: #00bcd4; }
.legbyes-btn { border-color: #009688; color: #009688; }

.btn-extra:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.wicket-button-container {
    text-align: center;
    margin-bottom: 1.5rem;
}

.wicket-btn-big {
    background: linear-gradient(135deg, #f44336, #d32f2f);
    color: white;
    padding: 1.5rem 3rem;
    border: none;
    border-radius: 12px;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    animation: pulseWicket 2s infinite;
}

.wicket-btn-big:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 25px rgba(244,67,54,0.4);
}

@keyframes pulseWicket {
    0%, 100% { box-shadow: 0 0 0 0 rgba(244,67,54,0.7); }
    50% { box-shadow: 0 0 0 15px rgba(244,67,54,0); }
}

.control-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
}

.btn-action {
    padding: 0.8rem 1.5rem;
    border: 2px solid;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    background: white;
}

.over-complete {
    border-color: var(--secondary-color);
    color: var(--secondary-color);
}
.over-complete:hover {
    background-color: var(--secondary-color);
    color: white;
}

.undo-btn {
    border-color: #ff9800;
    color: #ff9800;
}
.undo-btn:hover {
    background-color: #ff9800;
    color: white;
}

.switch-btn {
    border-color: #2196f3;
    color: #2196f3;
}
.switch-btn:hover {
    background-color: #2196f3;
    color: white;
}

.innings-control {
    text-align: center;
    padding-top: 1rem;
    border-top: 2px solid #eee;
}

.innings-end {
    padding: 1rem 2rem;
    font-size: 1.1rem;
}

/* Match Result */
.match-result-section {
    text-align: center;
    padding: 3rem;
}

.result-banner {
    background: linear-gradient(135deg, #ffd700, #ffa500);
    padding: 3rem;
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(255,165,0,0.3);
}

.result-banner h2 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
}

.result-banner p {
    font-size: 1.3rem;
    color: #555;
    margin-bottom: 2rem;
}

/* Commentary/Event Log */
.commentary-section {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
}

.commentary-section h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.event-log {
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 1rem;
}

.log-entry {
    padding: 0.8rem;
    border-bottom: 1px solid #f0f0f0;
    font-size: 0.95rem;
    line-height: 1.5;
}

.log-entry:last-child {
    border-bottom: none;
}

.log-entry .over-label {
    font-weight: bold;
    color: var(--primary-color);
    margin-right: 0.5rem;
}

/* Modal */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
}

.modal-content h3 {
    color: #dc3545;
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1.5rem;
}

.modal-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
}

.modal-actions button {
    flex: 1;
    padding: 1rem;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    font-size: 1rem;
}

/* Loading Overlay */
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255,255,255,0.95);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.spinner {
    width: 60px;
    height: 60px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
    .scoreboard-main {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .vs-divider {
        order: -1;
    }
    
    .vs-badge-large {
        width: 60px;
        height: 60px;
        font-size: 1rem;
    }
    
    .score-display {
        font-size: 3rem;
    }
    
    .players-info-bar {
        grid-template-columns: 1fr;
    }
    
    .runs-buttons {
        grid-template-columns: repeat(3, 1fr);
    }
    
    .extras-buttons {
        grid-template-columns: 1fr 1fr;
    }
    
    .control-actions {
        flex-direction: column;
    }
    
    .balls-display {
        gap: 0.5rem;
    }
    
    .ball-dot {
        width: 40px;
        height: 40px;
        font-size: 1rem;
    }
}
