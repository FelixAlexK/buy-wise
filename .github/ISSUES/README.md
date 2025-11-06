# Buy Wise - Issue Templates

This directory contains pre-formatted issue templates for all features outlined in [IDEAS.md](../../IDEAS.md). Each file represents a separate feature that can be implemented as a GitHub issue.

## How to Use

### Option 1: Manual Issue Creation (Recommended for selective implementation)
1. Browse through the issue files in this directory
2. Choose the features you want to implement
3. Copy the content of the chosen file(s)
4. Create a new GitHub issue
5. Paste the content and submit

### Option 2: Bulk Issue Creation (For comprehensive planning)
You can use the GitHub CLI to create multiple issues at once:

```bash
# Install GitHub CLI if you haven't already
# https://cli.github.com/

# Navigate to the .github/ISSUES directory
cd .github/ISSUES

# Create an issue from a template file
gh issue create --title "$(grep '^title:' 01-purchase-categories-tagging.md | cut -d'"' -f2)" --body-file 01-purchase-categories-tagging.md

# Or create all issues at once (be careful!)
for file in *.md; do
  if [ "$file" != "README.md" ] && [ "$file" != "INDEX.md" ]; then
    title=$(grep '^title:' "$file" | cut -d'"' -f2)
    gh issue create --title "$title" --body-file "$file"
  fi
done
```

## File Naming Convention

Files are named with a numeric prefix followed by a descriptive slug:
- `01-purchase-categories-tagging.md`
- `02-spending-trends-charts.md`
- etc.

The numbering roughly follows the order in IDEAS.md and can help with prioritization.

## Issue Structure

Each issue file contains:
- **Title**: Feature name in format "Feature: [Name]"
- **Labels**: Suggested GitHub labels (complexity, category, priority)
- **Category**: The section from IDEAS.md
- **Complexity**: Estimated implementation complexity
- **Description**: Brief explanation of the feature
- **Benefits**: Why this feature is valuable
- **Implementation Tasks**: Checklist of tasks to complete
- **Related**: Links to relevant documentation

## Prioritization

Issues are tagged with priority indicators:
- **quick-win**: Low complexity, high value features to start with
- **high-impact**: Features that significantly enhance the app
- **low-complexity**: Easier to implement
- **medium-complexity**: Moderate effort required
- **high-complexity**: Significant development effort
- **very-high-complexity**: Major undertaking

## Categories

Issues are organized by these categories (matching IDEAS.md):
1. Analytics & Insights
2. Enhanced Features
3. User Experience Enhancements
4. Technical Improvements
5. Social & Sharing Features
6. Smart Features
7. Privacy & Security
8. Integration Ideas
9. Educational Features

## Recommended Starting Points

Based on the "Quick Wins" section in IDEAS.md, start with:
1. **03-purchase-decision-analysis.md** - Track buy/don't-buy ratio
2. **14-onboarding-tutorial.md** - Help new users get started
3. **17-data-export-import.md** - Allow data export
4. **35-financial-tips-articles.md** - Display saving tips
5. **08-purchase-reminders.md** - Cooling-off period for decisions
6. **31-privacy-mode.md** - Hide sensitive data when needed
7. **13-gamification.md** - Simple achievements and badges

## See Also

- [IDEAS.md](../../IDEAS.md) - Full feature descriptions
- [ROADMAP.md](../../ROADMAP.md) - Phased implementation timeline
- [INDEX.md](./INDEX.md) - Organized index of all issues
