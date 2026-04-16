<!DOCTYPE html>
<html lang="hi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - Village Cricket</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/admin.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar admin-nav">
        <div class="nav-brand">🏏 Admin Panel</div>
        <div class="nav-links">
            <a href="index.html">← Back to Site</a>
            <a href="#" class="btn-admin" onclick="logout()">Logout</a>
        </div>
    </nav>

    <div class="admin-container">
        <!-- Sidebar -->
        <aside class="admin-sidebar">
            <h3>📋 Management</h3>
            <ul class="sidebar-menu">
                <li><a href="#tournaments" class="active" onclick="showSection('tournaments')">🏆 Tournaments</a></li>
                <li><a href="#teams" onclick="showSection('teams')">👥 Teams</a></li>
                <li><a href="#players" onclick="showSection('players')">🎮 Players</a></li>
                <li><a href="#matches" onclick="showSection('matches')">📅 Matches</a></li>
                <li><a href="#scoring" onclick="showSection('scoring')">⚡ Live Scoring</a></li>
                <li><a href="#settings" onclick="showSection('settings')">⚙️ Settings</a></li>
            </ul>
        </aside>

        <!-- Main Content -->
        <main class="admin-main">
            
            <!-- Tournaments Section -->
            <section id="section-tournaments" class="admin-section active">
                <h2>🏆 Tournament Management</h2>
                
                <div class="card">
                    <h3>Create New Tournament</h3>
                    <form id="tournament-form" onsubmit="createTournament(event)">
                        <div class="form-group">
                            <label>Tournament Name *</label>
                            <input type="text" name="name" required placeholder="e.g., Village Cup 2024">
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Start Date *</label>
                                <input type="date" name="startDate" required>
                            </div>
                            <div class="form-group">
                                <label>End Date *</label>
                                <input type="date" name="endDate" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Format</label>
                                <select name="format">
                                    <option value="league">League (Round Robin)</option>
                                    <option value="knockout">Knockout</option>
                                    <option value="double-knockout">Double Knockout</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Overs Per Side</label>
                                <input type="number" name="overs" value="10" min="5" max="50">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea name="description" rows="3" placeholder="Tournament details..."></textarea>
                        </div>
                        <button type="submit" class="btn-primary">Create Tournament</button>
                    </form>
                </div>

                <div class="card">
                    <h3>Active Tournaments</h3>
                    <div id="tournaments-list"></div>
                </div>
            </section>

            <!-- Teams Section -->
            <section id="section-teams" class="admin-section">
                <h2>👥 Team Management</h2>
                
                <div class="card">
                    <h3>Add New Team</h3>
                    <form id="team-form" onsubmit="createTeam(event)">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Team Name *</label>
                                <input type="text" name="name" required placeholder="e.g., Village XI">
                            </div>
                            <div class="form-group">
                                <label>Emoji/Logo</label>
                                <input type="text" name="emoji" placeholder="e.g., 🔥" maxlength="2">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Captain Name *</label>
                                <input type="text" name="captain" required>
                            </div>
                            <div class="form-group">
                                <label>Contact Number</label>
                                <input type="tel" name="contact" placeholder="10-digit number">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Village/Area</label>
                            <input type="text" name="village" placeholder="e.g., West Village">
                        </div>
                        <button type="submit" class="btn-primary">Add Team</button>
                    </form>
                </div>

                <div class="card">
                    <h3>All Teams (<span id="teams-count">0</span>)</h3>
                    <div class="table-responsive">
                        <table class="admin-table">
                            <thead>
                                <tr>
                                    <th>Team</th>
                                    <th>Captain</th>
                                    <th>Village</th>
                                    <th>Players</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="teams-table-body"></tbody>
                        </table>
                    </div>
                </div>
            </section>

            <!-- Players Section -->
            <section id="section-players" class="admin-section">
                <h2>🎮 Player Management</h2>
                
                <div class="card">
                    <h3>Add Player to Team</h3>
                    <form id="player-form" onsubmit="addPlayer(event)">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Select Team *</label>
                                <select name="teamId" id="player-team-select" required>
                                    <option value="">Choose Team...</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Player Name *</label>
                                <input type="text" name="name" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Role</label>
                                <select name="role">
                                    <option value="batsman">Batsman</option>
                                    <option value="bowler">Bowler</option>
                                    <option value="allrounder">All-Rounder</option>
                                    <option value="wicketkeeper">Wicket-Keeper</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Jersey Number</label>
                                <input type="number" name="jerseyNumber" min="1" max="99">
                            </div>
                        </div>
                        <button type="submit" class="btn-primary">Add Player</button>
                    </form>
                </div>

                <div class="card">
                    <h3>All Players</h3>
                    <div id="players-list"></div>
                </div>
            </section>

            <!-- Matches Section -->
            <section id="section-matches" class="admin-section">
                <h2>📅 Match Scheduling</h2>
                
                <div class="card">
                    <h3>Schedule New Match</h3>
                    <form id="match-form" onsubmit="scheduleMatch(event)">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Team 1 *</label>
                                <select name="team1Id" id="match-team1" required>
                                    <option value="">Select Team 1...</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Team 2 *</label>
                                <select name="team2Id" id="match-team2" required>
                                    <option value="">Select Team 2...</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Match Date & Time *</label>
                                <input type="datetime-local" name="dateTime" required>
                            </div>
                            <div class="form-group">
                                <label>Ground/Venue</label>
                                <input type="text" name="venue" placeholder="e.g., Village Ground">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Match Type</label>
                            <select name="matchType">
                                <option value="league">League Match</option>
                                <option value="semifinal">Semi-Final</option>
                                <option value="final">Final</option>
                            </select>
                        </div>
                        <button type="submit" class="btn-primary">Schedule Match</button>
                    </form>
                </div>

                <div class="card">
                    <h3>All Matches</h3>
                    <div class="filter-bar">
                        <select id="match-filter" onchange="filterMatches()">
                            <option value="all">All Matches</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="live">Live</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div id="matches-list-admin"></div>
                </div>
            </section>

            <!-- Live Scoring Section -->
            <section id="section-scoring" class="admin-section">
                <h2>⚡ Live Scoring System</h2>
                
                <div class="card scoring-card">
                    <h3>Select Match for Scoring</h3>
                    <select id="scoring-match-select" onchange="loadScoringInterface()">
                        <option value="">Choose a match...</option>
                    </select>
                    
                    <div id="scoring-interface" style="display:none; margin-top: 2rem;">
                        <!-- Scoring UI will load here -->
                    </div>
                </div>
            </section>

            <!-- Settings Section -->
            <section id="section-settings" class="admin-section">
                <h2>⚙️ Settings</h2>
                
                <div class="card">
                    <h3>Tournament Settings</h3>
                    <form onsubmit="updateSettings(event)">
                        <div class="form-group">
                            <label>Points for Win</label>
                            <input type="number" name="pointsWin" value="2" min="0">
                        </div>
                        <div class="form-group">
                            <label>Points for Tie</label>
                            <input type="number" name="pointsTie" value="1" min="0">
                        </div>
                        <div class="form-group">
                            <label>Overs per Innings</label>
                            <input type="number" name="oversPerInning" value="10" min="5" max="50">
                        </div>
                        <button type="submit" class="btn-primary">Save Settings</button>
                    </form>
                </div>

                <div class="card danger-zone">
                    <h3>⚠️ Danger Zone</h3>
                    <p>Delete all data (This action cannot be undone!)</p>
                    <button class="btn-danger" onclick="confirmDeleteAllData()">Delete All Data</button>
                </div>
            </section>

        </main>
    </div>

    <!-- Toast Notification -->
    <div id="toast" class="toast"></div>

    <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore-compat.js"></script>
    <script src="firebase-config.js"></script>
    <script src="js/admin.js"></script>
</body>
</html>
