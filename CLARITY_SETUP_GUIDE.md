# Microsoft Clarity Setup Guide

## ✅ Completed Steps

1. **Added Clarity tracking script to `index.html`**
2. **Created utility functions in `src/utils/clarity.ts`**
3. **Integrated initialization in `src/App.tsx`**

## 🔧 Next Steps (Action Required)

### Step 1: Get Your Clarity Project ID

1. Go to [https://clarity.microsoft.com](https://clarity.microsoft.com)
2. Sign in with your Microsoft account
3. Click "Create project"
4. Fill in project details:
   - **Site name**: Daniel Bodi Gil Portfolio
   - **Website URL**: https://danielbodigil.com
   - **Site category**: Portfolio or Personal
5. Copy your **Project ID** (it will look something like `abcd1234ef`)

### Step 2: Update the Tracking Code

1. Open `index.html`
2. Find line 52: `"YOUR_PROJECT_ID"`
3. Replace `YOUR_PROJECT_ID` with your actual project ID from Step 1
4. Save the file

**Example:**
```html
<!-- Before -->
})(window,document,"clarity","script","YOUR_PROJECT_ID");

<!-- After -->
})(window,document,"clarity","script","abcd1234ef");
```

### Step 3: Deploy and Test

1. **Deploy your website** with the updated tracking code
2. **Visit your live website** and navigate through a few pages
3. **Check your Clarity dashboard** (may take 10-15 minutes for data to appear)
4. Look for:
   - Page views being recorded
   - Session recordings starting to appear
   - Heatmap data being collected

## 🎯 What You'll Get

### Immediate Insights:
- **User behavior**: See exactly where visitors click and scroll
- **Session recordings**: Watch real user sessions to identify friction points
- **Traffic sources**: Understand how people find your portfolio
- **Device usage**: Desktop vs mobile visitor patterns
- **Popular content**: Which projects get the most attention

### Advanced Tracking:
The setup includes custom utilities for:
- **Project page tracking**: Automatically tags project page visits
- **Portfolio events**: Track CV downloads, contact clicks, skill interactions
- **Privacy protection**: Masks sensitive elements from recordings
- **Custom user identification**: Track returning visitors

## 🔍 Verifying the Installation

### Browser Developer Tools Check:
1. Open your website
2. Press F12 to open Developer Tools
3. Go to Network tab
4. Look for requests to `clarity.ms`
5. Check Console for "Microsoft Clarity initialized successfully"

### Clarity Dashboard Check:
1. Go to your Clarity project dashboard
2. Check the "Live" tab for real-time visitors
3. View "Recordings" tab for session replays
4. Check "Heatmaps" tab for click/scroll data

## 🛡️ Privacy & Performance

### Privacy Features Included:
- Automatically masks elements with `clarity-mask` class
- Respects user privacy settings
- GDPR compliant data collection

### Performance Optimized:
- Async loading (won't block page rendering)
- Lightweight script (< 2KB)
- No impact on Core Web Vitals

## 📊 Custom Events Setup

Your setup includes these portfolio-specific events:

```typescript
// Track project views
trackPortfolioEvent('project_view', { project: 'bridgestone' });

// Track contact interactions
trackPortfolioEvent('contact_click', { method: 'email' });

// Track CV downloads
trackPortfolioEvent('cv_download', { format: 'pdf' });
```

These are automatically implemented and will provide insights into how visitors engage with your portfolio content.

## 🚨 Important Notes

1. **Replace the Project ID**: The tracking won't work until you update `YOUR_PROJECT_ID`
2. **Wait for data**: First data appears after 10-15 minutes
3. **Test on live site**: Clarity only works on deployed websites, not localhost
4. **Check regularly**: Review insights weekly to optimize your portfolio

## 🔧 Troubleshooting

### DNS/Network Issues
If you see `ERR_NAME_NOT_RESOLVED` for `clarity.ms`:

1. **Check Network**: Corporate/school networks often block analytics domains
2. **Try Different Network**: Test from mobile hotspot or different location
3. **Disable VPN**: Temporarily disable VPN/proxy to test
4. **Check DNS**: Some DNS filters (Pi-hole, AdGuard) block tracking domains

### Fallback Analytics
Your setup includes a backup analytics system that works even when Clarity is blocked:
- Tracks clicks, scroll depth, time on page
- Stores data locally in browser
- Can be exported or sent to your own analytics endpoint
- Access via browser console: `window.analytics.getStats()`

### Common Solutions
- **Clear browser cache** and test in incognito mode
- **Check browser extensions** (ad blockers may interfere)
- **Verify CSP headers** are properly configured
- **Test from different devices/browsers**

## 🔗 Useful Links

- [Clarity Dashboard](https://clarity.microsoft.com)
- [Clarity Documentation](https://docs.microsoft.com/en-us/clarity/)
- [Clarity Chrome Extension](https://chrome.google.com/webstore/detail/clarity/fchclhkcocoaiigpodpkalkkflfkdngg)

---

**Need help?** Contact Microsoft Clarity support or check their extensive documentation for troubleshooting tips.