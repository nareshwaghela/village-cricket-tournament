# 🏏 Village Cricket Tournament Management System

## 📋 Project Overview

Complete cricket tournament management system for village/local matches with:
- ✅ Tournament & Team Management
- ✅ Player Registration
- ✅ Match Scheduling
- ✅ Live Scoring System
- ✅ Real-time Scoreboard
- ✅ Points Table & Statistics
- ✅ Firebase Backend (Free)
- ✅ GitHub Deployment Ready

## 🚀 Features

### For Admin:
1. **Tournament Creation**
   - Create multiple tournaments
   - Set format (League/Knockout)
   - Configure overs, dates

2. **Team Management**
   - Add teams with details
   - Assign captains
   - Track team statistics

3. **Player Management**
   - Register players to teams
   - Define roles (Batsman/Bowler/All-Rounder)
   - Track individual statistics

4. **Match Scheduling**
   - Schedule matches with date/time
   - Select venue/ground
   - Match type (League/Semi/Final)

5. **Live Scoring System** ⭐
   - Ball-by-ball scoring
   - Runs (0,1,2,3,4,6)
   - Extras (Wide, No Ball, Byes, Leg Byes)
   - Wicket recording with dismissal types
   - Over management
   - Innings control
   - Undo functionality

### For Public Viewers:
1. **Live Scoreboard**
   - Real-time score updates
   - Current batsmen/bowler info
   - This over display
   - Run rate calculation

2. **Match Information**
   - Upcoming matches
   - Recent results
   - Match history

3. **Statistics**
   - Points table (auto-calculated)
   - Net run rate
   - Top performers (Batsman/Bowler)

4. **Team Information**
   - All participating teams
   - Team squads
   - Captain details

## 📁 Project Structure

```
village-cricket-app/
├── index.html              # Homepage (Public view)
├── admin.html              # Admin Panel
├── scoreboard.html         # Live Scoring Interface
├── css/
│   ├── style.css           # Main styles
│   ├── admin.css           # Admin panel styles
│   └── scoreboard.css      # Scoreboard styles
├── js/
│   ├── app.js              # Main application logic
│   ├── admin.js            # Admin panel functions
│   └── scoring.js          # Scoring system logic
├── firebase-config.js      # Firebase configuration
└── README.md               # This file
```

## 🔧 Setup Instructions

### Prerequisites:
1. ✅ Google Account (for Firebase)
2. ✅ GitHub Account
3. ✅ Code Editor (VS Code recommended)
4. ✅ Modern web browser

---

## Step 1: Firebase Setup (5 minutes)

### 1. Create Firebase Project:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create Project"
3. Name: `village-cricket-tournament`
4. Enable Google Analytics (optional)
5. Click "Create Project"

### 2. Enable Firestore Database:
1. In Firebase Console → Build → Firestore Database
2. Click "Create Database"
3. Choose "Start in test mode" (for now)
4. Select region (closest to you)
5. Click "Enable"

### 3. Get Configuration:
1. Go to Project Settings ⚙️ (gear icon)
2. Scroll down to "Your apps"
3. Click web app icon (`</>`)
4. Register app nickname: "Village Cricket"
5. Copy the `firebaseConfig` object
6. Paste it in `firebase-config.js`

**Example:**
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXX",
    authDomain: "village-cricket.firebaseapp.com",
    projectId: "village-cricket",
    storageBucket: "village-cricket.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};
```

### 4. Enable Hosting:
1. Go to Build → Hosting in left menu
2. Click "Get started"
3. Follow instructions

---

## Step 2: Local Development

### 1. Download/Clone Files:
```bash
# Create project folder
mkdir village-cricket-app
cd village-cricket-app

# Create all files from above code
```

### 2. Update Firebase Config:
- Open `firebase-config.js`
- Replace placeholder values with your actual config

### 3. Test Locally:
```bash
# Option A: Simple HTTP server (Python)
python -m http.server 8000

# Option B: VS Code Live Server extension
# Right-click index.html → Open with Live Server

# Option C: Node.js
npx serve .
```

Open browser: `http://localhost:8000`

---

## Step 3: GitHub Setup (3 minutes)

### 1. Create Repository:
1. Go to [GitHub](https://github.com) → New repository
2. Name: `village-cricket-tournament`
3. Description: "Village Cricket Tournament System"
4. Keep it Public or Private
5. Don't initialize with README (we have one)
6. Click "Create repository"

### 2. Push Code:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Complete Cricket System"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/village-cricket-tournament.git

# Push to main branch
git push -u origin main
```

**If git not installed:** Download from [git-scm.com](https://git-scm.com/)

---

## Step 4: Deploy to Firebase (2 minutes)

### 1. Install Firebase CLI:
```bash
# Using npm (Node.js required)
npm install -g firebase-tools

# Or using yarn
yarn global add firebase-tools
```

### 2. Login to Firebase:
```bash
firebase login
```
This will open browser → Login with your Google account → Allow permissions

### 3. Initialize Firebase in project:
```bash
firebase init hosting
```

**Answer prompts:**
```
? What do you want to use as your public directory? . (type dot and press Enter)
? Configure as a single-page app? Yes
? File index.html already exists. Overwrite? No
? Set up automatic builds and deploys with GitHub? No (or Yes if you want CI/CD)
```

### 4. Deploy:
```bash
firebase deploy
```

**Success message:**
```
✓ Deploy complete!
Project Console: https://console.firebase.google.com/project/village-cricket/...
Hosting URL: https://village-cricket.web.app
```

🎉 **Your site is LIVE!**

---

## 🎯 How to Use

### First Time Setup:

#### 1. Create Tournament:
1. Open website → Click "Admin Panel" button
2. Go to "Tournaments" section
3. Fill form:
   - Name: "Village Cup 2024"
   - Start Date: Today's date
   - End Date: After a week
   - Format: League (recommended for villages)
   - Overs: 10 (standard for village cricket)
4. Click "Create Tournament"
5. Click "Set Active"

#### 2. Add Teams:
1. Go to "Teams" section
2. Add each village team:
   ```
   Example Teams:
   - West Village XI 🔥
   - East Village Warriors ⚡
   - North Village Strikers 🏏
   - South Village Royals 👑
   ```
3. Add captain name, contact number, village name

#### 3. Add Players:
1. Go to "Players" section
2. For each team, add 11-15 players:
   - Player names
   - Roles (mix of batsman, bowler, allrounder)
   - Jersey numbers (optional)

#### 4. Schedule Matches:
1. Go to "Matches" section
2. Schedule league matches:
   - Each team plays every other team
   - Set date/time (evening preferred)
   - Venue: "Main Ground", "School Ground", etc.
3. For 4 teams = 6 matches total

#### 5. Start Live Scoring:
1. On match day, go to Admin → Matches
2. Find upcoming match → Click "▶️ Start"
3. Click "⚡ Score" button
4. You'll be redirected to Scoreboard page
5. Use buttons to update score:
   - **Runs**: 0, 1, 2, 3, 4, 6
   - **Extras**: Wide, No Ball, Byes
   - **Wicket**: Opens modal to record dismissal
6. Score updates in real-time!

### For Viewers:
1. Open homepage URL
2. See live match banner (if match is live)
3. Click "Watch Live" to see scoreboard
4. Auto-refreshes every 30 seconds

---

## 📊 Data Structure (Firestore)

### Collections:

#### tournaments
```json
{
    "name": "Village Cup 2024",
    "format": "league",
    "overs": 10,
    "startDate": timestamp,
    "endDate": timestamp,
    "status": "active",
    "createdAt": timestamp
}
```

#### teams
```json
{
    "name": "West Village XI",
    "emoji": "🔥",
    "captain": "Rahul Sharma",
    "contact": "9876543210",
    "village": "West Village",
    "tournamentId": "xxx",
    "stats": {
        "played": 0,
        "won": 0,
        "lost": 0,
        "points": 0,
        "nrr": 0.000
    }
}
```

#### players
```json
{
    "teamId": "xxx",
    "name": "Rahul Sharma",
    "role": "allrounder",
    "jerseyNumber": 7,
    "battingStats": {
        "matches": 0,
        "runs": 0,
        "average": 0.00
    },
    "bowlingStats": {
        "matches": 0,
        "wickets": 0,
        "average": 0.00
    }
}
```

#### matches
```json
{
    "team1Id": "xxx",
    "team2Id": "yyy",
    "dateTime": timestamp,
    "venue": "Main Ground",
    "matchType": "league",
    "status": "live",
    "team1Score": {"runs": 45, "wickets": 2, "overs": 8.3},
    "team2Score": {"runs": 0, "wickets": 0, "overs": 0},
    "matchState": { /* complex scoring object */ },
    "result": null,
    "winnerId": null
}
```

---

## 🛠️ Customization Guide

### Change Colors:
Edit `css/style.css`:
```css
:root {
    --primary-color: #1a5f2a;    /* Main green */
    --secondary-color: #2d8a3e;  /* Lighter green */
    --accent-color: #ff6b35;     /* Orange accent */
}
```

### Change Overs Limit:
Default is 10 overs. To change:
1. Admin → Settings → Update "Overs per Innings"
2. Or edit default in code: `overs: 10`

### Add More Stats:
The system tracks basic stats. To add more:
- Edit `scoring.js` → `batsmenStats` and `bowlerStats` objects
- Update display in `scoreboard.html`

### Change Language:
Currently Hindi-English mix. To make fully English:
- Find all Hindi text in HTML files
- Replace with English equivalents

---

## ❓ Troubleshooting

### Issue: Data not saving
**Solution:**
- Check Firebase config is correct
- Check Firestore rules allow writes
- Open browser console (F12) for errors

### Issue: Live score not updating
**Solution:**
- Refresh page
- Check internet connection
- Verify match status is "live" in Firestore

### Issue: Deployment error
**Solution:**
```bash
# Clear cache and redeploy
firebase deploy --only hosting
```

### Issue: Can't see admin panel
**Solution:**
- Admin panel link is on homepage navbar
- Direct access: `your-site.com/admin.html`

---

## 💰 Costs

### FREE Tier (Forever):
- **Firestore**: 1 GB storage, 50k reads/day, 20k writes/day
- **Hosting**: 10 GB bandwidth/month
- **Enough for village tournament!**

### If limits exceeded:
- Upgrade to Blaze plan (pay-as-you-go)
- ~$0.18/GB storage
- Very cheap for small usage

---

## 🔒 Security Notes

### Current Setup (Test Mode):
- Anyone can read/write data
- Good for development/testing

### For Production (Recommended):
Update Firestore Rules in Firebase Console → Firestore → Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read
    match /{document=**} {
      allow read: if true;
      
      // Restrict writes (admin only - implement auth later)
      allow write: if request.auth.token.admin == true;
    }
  }
}
```

---

## 📱 Mobile Responsive

✅ Fully responsive design
✅ Works on all devices:
- Desktop/Laptop
- Tablets
- Mobile phones (Android/iOS)

Test by resizing browser window!

---

## 🔄 Backup Your Data

### Manual Export:
1. Firebase Console → Firestore
2. Click three dots (⋮) → Export
3. Download JSON/CSV backup

### Automatic Backups:
Use Firebase scheduled exports (paid feature)

---

## 🆘 Support & Help

### Common Questions:

**Q: How many teams can I add?**
A: Unlimited! But 4-8 teams ideal for village tournament.

**Q: Can I run multiple tournaments?**
A: Yes! Create new tournament in admin panel.

**Q: Does it work offline?**
A: Limited. Scores need internet to save to Firebase.

**Q: Can I customize the look?**
A: Yes! All CSS files are editable.

---

## 🎉 Next Steps / Enhancements

You can add these features later:

### Phase 2 Features:
- [ ] User Authentication (Login system)
- [ ] Photo upload for teams/players
- [ ] Advanced statistics graphs
- [ ] Match highlights/replay
- [ ] Push notifications for live matches
- [ ] Share scores on WhatsApp
- [ ] Print scorecards (PDF)

### Phase 3 Features:
- [ ] Mobile app (React Native/Flutter)
- [ ] Video streaming integration
- [ ] Sponsor management
- [ ] Payment collection (entry fees)
- [ ] Umpire scoring app
- [ ] Multiple grounds support

---

## 📞 Contact / Contributing

Found a bug? Want to contribute?
1. Create issue on GitHub
2. Submit pull request
3. Email: your-email@example.com

---

## 📄 License

MIT License - Free to use, modify, distribute

---

## ⭐ Star this Project

If this helped you, please give it a star on GitHub! ⭐

---

**Made with ❤️ for Village Cricket**

*Transforming local cricket into professional experience!* 🏏✨
