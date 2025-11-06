# Using the Issue Templates

All ideas from [IDEAS.md](IDEAS.md) have been broken down into individual issue templates!

## 📍 Location

Find all issue templates in: **[`.github/ISSUES/`](.github/ISSUES/)**

## 🚀 Quick Start

### Browse Available Issues
1. Go to [`.github/ISSUES/INDEX.md`](.github/ISSUES/INDEX.md) for a complete categorized list
2. Choose features based on:
   - ⚡ **Quick Wins** - Low effort, high value
   - 🎯 **High Impact** - Significant app enhancement
   - Complexity level (Low, Medium, High)

### Create GitHub Issues

**Option 1: Manual (Recommended for selective features)**
```bash
# 1. Browse .github/ISSUES/ directory
# 2. Pick a feature file (e.g., 03-purchase-decision-analysis.md)
# 3. Copy the content
# 4. Create new GitHub issue
# 5. Paste content and submit
```

**Option 2: Automated with GitHub CLI**
```bash
# Install GitHub CLI: https://cli.github.com/
cd .github/ISSUES

# Create a single issue
gh issue create --title "Feature: Purchase Decision Analysis" \
  --body-file 03-purchase-decision-analysis.md

# Create all issues at once (use with caution!)
for file in *.md; do
  if [ "$file" != "README.md" ] && [ "$file" != "INDEX.md" ]; then
    title=$(grep '^title:' "$file" | cut -d'"' -f2)
    gh issue create --title "$title" --body-file "$file"
  fi
done
```

## 📚 Documentation Structure

- **[IDEAS.md](IDEAS.md)** - Full feature descriptions with context
- **[ROADMAP.md](ROADMAP.md)** - Phased implementation timeline
- **[.github/ISSUES/README.md](.github/ISSUES/README.md)** - Detailed usage guide
- **[.github/ISSUES/INDEX.md](.github/ISSUES/INDEX.md)** - Organized index of all 37 issues

## 🎯 Recommended Starting Points

Begin with these 7 Quick Win features:
1. [Purchase Decision Analysis](.github/ISSUES/03-purchase-decision-analysis.md) - Track buy/don't-buy ratio
2. [Onboarding Tutorial](.github/ISSUES/14-onboarding-tutorial.md) - Help new users get started
3. [Data Export/Import](.github/ISSUES/17-data-export-import.md) - Allow data backup
4. [Financial Tips](.github/ISSUES/35-financial-tips-articles.md) - Display saving tips
5. [Purchase Reminders](.github/ISSUES/08-purchase-reminders.md) - Cooling-off periods
6. [Privacy Mode](.github/ISSUES/31-privacy-mode.md) - Hide sensitive data
7. [Gamification Basics](.github/ISSUES/13-gamification.md) - Achievements and badges

## 📊 Issue Overview

- **Total Features**: 37 issues ready to implement
- **Quick Wins**: 7 low-complexity, high-value features
- **High Impact**: 6 features that significantly enhance the app
- **Categories**: 9 different feature categories

### Complexity Breakdown
- Low: 11 issues (30%)
- Medium: 15 issues (40%)
- High: 10 issues (27%)
- Very High: 1 issue (3%)

## 💡 Tips

- Start with Quick Wins to build momentum
- Tackle one issue at a time to avoid getting overwhelmed
- Each issue includes:
  - Clear description and benefits
  - Detailed implementation checklist
  - Suggested labels and complexity rating
  - Links to related documentation

## 🤝 Contributing

When implementing features:
1. Create an issue from the template
2. Fork the repository
3. Create a feature branch
4. Implement following the checklist
5. Submit a pull request
6. Reference the issue number

---

**Ready to start?** Check out [.github/ISSUES/INDEX.md](.github/ISSUES/INDEX.md) to browse all available features!
