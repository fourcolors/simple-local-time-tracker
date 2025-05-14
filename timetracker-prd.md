# Product Requirements Document: Time Tracker Application

## 1. Project Overview

### Product Vision
A desktop time tracking application built with Tauri 2 and React that allows users to effortlessly track time spent on tasks, organize entries with tags, and generate comprehensive reports. The application runs in the background and provides quick-access functionality similar to Alfred or Raycast.

### Core Objectives
- Enable seamless time tracking with minimal friction
- Provide intuitive task entry and organization
- Deliver powerful reporting capabilities
- Ensure the application runs efficiently in the background
- Create a polished UI with smooth animations

## 2. User Requirements

### Functional Requirements

#### Time Tracking
- Users can manually input time entries
- Users can type a task name and press enter to automatically start tracking time
- Active timers continue running in the background when the app is closed
- Starting a new task automatically stops any currently running timer

#### Task Organization
- Users can tag time entries for categorization
- The system remembers the last used tag for continuous work
- Users can view, edit, and delete past time entries

#### Quick Access
- Global shortcut brings up a quick entry bar (similar to Alfred/Raycast)
- Quick entry bar allows instant time tracking without opening the main app
- Configurable keyboard shortcuts for common actions

#### Reporting
- Visual reports showing time distribution
- Tabular data with filtering and sorting options
- Export functionality for sharing or analysis

### Non-Functional Requirements
- Response time: Application should feel instant when entering tasks
- Reliability: Time tracking must continue accurately in the background
- Data integrity: No data loss during app restarts or system shutdowns
- Visual design: Clean, minimal interface using shadcn UI components

## 3. Technical Architecture

### Frontend
- **Framework**: React with TypeScript
- **UI Components**: shadcn UI with Acternity theme
- **Animations**: Framer Motion
- **State Management**: Zustand for app-wide state

### Backend
- **Platform**: Tauri 2 
- **Storage**: Local storage (IndexedDB) for persistent data
- **Background Services**: Tauri background process for timer management

### Core Technologies
```
- React 18+
- TypeScript 5+
- Tauri 2.0
- shadcn/ui
- Framer Motion
- Zustand
- Recharts (for data visualization)
```

## 4. Data Models

### Time Entry
```typescript
interface TimeEntry {
  id: string;              // Unique identifier
  description: string;     // Task description
  tagIds: string[];        // Associated tags
  startTime: number;       // Unix timestamp
  endTime: number | null;  // Unix timestamp or null if ongoing
  isActive: boolean;       // Whether this timer is currently running
  createdAt: number;       // Creation timestamp
  updatedAt: number;       // Last update timestamp
}
```

### Tag
```typescript
interface Tag {
  id: string;           // Unique identifier
  name: string;         // Tag name
  color: string;        // Color (hex code)
  createdAt: number;    // Creation timestamp
}
```

### Settings
```typescript
interface Settings {
  shortcuts: {
    quickAccess: string;        // Global shortcut for quick entry bar
    startStopTimer: string;     // Shortcut to start/stop current timer
    newEntry: string;           // Shortcut to create new entry
  };
  defaultTagId: string | null;  // Default tag for new entries
  theme: 'light' | 'dark' | 'system';
  reportDefaultRange: {
    start: number;              // Default report start date
    end: number;                // Default report end date
  };
}
```

## 5. Feature Specifications

### Main Dashboard

#### Time Entry List
- Displays all time entries in reverse chronological order
- Shows description, tag(s), start time, end time, and duration
- Allows filtering by tag, date range, and search term
- Enables editing or deleting entries
- Provides button to start a new timer

#### Active Timer
- Prominently displays current task (if any)
- Shows elapsed time with second precision
- Offers controls to pause, resume, or stop the timer
- Allows quick tag switching for active timer

### Quick Entry Bar

#### Functionality
- Appears when global shortcut is pressed (even when app is closed)
- Accepts task description via text input
- Offers tag selection via dropdown
- Starts timer immediately upon pressing Enter
- Shows current running timer (if any) for quick reference

#### UI Components
- Floating bar with minimalist design
- Text input field (auto-focused)
- Tag selector (with color indicators)
- Timer display for current task
- Animation for appearing/disappearing

### Settings Page

#### Shortcut Configuration
- Interface for setting custom keyboard shortcuts
- Visual keyboard representation for shortcut selection
- Testing capability for configured shortcuts

#### General Settings
- Theme selection (light, dark, system)
- Default tag selection
- Data management (backup, restore, reset)

### Reporting Page

#### Time Visualization
- Bar chart showing time distribution by day/week/month
- Pie chart showing time distribution by tag
- Timeline view showing daily patterns

#### Data Table
- Sortable columns (description, start time, end time, duration, tags)
- Filtering options (by tag, date range, minimum duration)
- Pagination for large datasets
- Inline editing capability

#### Export Options
- CSV export for spreadsheet analysis
- JSON export for data backup
- PDF export for sharing reports

## 6. User Interface Design

### Design System
- Based on shadcn UI components with Acternity theme
- Consistent spacing, typography, and color system
- Light and dark mode support
- Smooth animations using Framer Motion

### Layout Structure
- Sidebar navigation for main sections (Dashboard, Reports, Settings)
- Content area with contextual controls and data display
- System tray icon for background operation
- Minimal, focused quick entry overlay

### Key Interface Components

#### Task Input
- Single input field for task description
- Tag selection dropdown with color indicators
- Start button with play icon
- Auto-suggest based on previous entries

#### Timer Display
- Current task name
- Elapsed time in HH:MM:SS format
- Visual indicator of running status
- Controls for pause, resume, stop

#### Reports Configuration
- Date range picker
- Tag filter multi-select
- Chart type selector
- Export controls

## 7. User Workflows

### Starting a New Task
1. User presses global shortcut (default: Alt+Space)
2. Quick entry bar appears
3. User types task description
4. User selects tag or uses default
5. User presses Enter
6. Previous timer automatically stops
7. New timer starts and runs in background

### Reviewing and Editing Time Entries
1. User opens main application
2. Views list of time entries
3. Filters or searches for specific entries
4. Clicks on entry to edit details
5. Updates information and saves changes

### Generating Reports
1. User navigates to Reports section
2. Selects desired date range and tags
3. Views visualizations of time distribution
4. Adjusts filters to refine analysis
5. Exports data in desired format

## 8. Storage and Data Management

### Data Storage Strategy
- Use IndexedDB for persistent storage of time entries and tags
- Store application settings in localStorage for quick access
- Implement periodic auto-save for active timers (every 30 seconds)

### Data Schema
- Normalized data structure with separate stores for entries and tags
- Indexing on frequently queried fields (date, tags, description)
- Timestamp-based versioning for conflict resolution

### Backup and Restore
- Automated daily backup to local file
- Manual backup option with custom file location
- Restore functionality with validation

## 9. Implementation Plan

### Phase 1: Core Functionality
- Set up Tauri 2 with React project structure
- Implement basic UI with shadcn components
- Create time entry and tag data models
- Build timer core functionality
- Establish local storage system

### Phase 2: Enhanced Features
- Implement global shortcuts and quick entry bar
- Create background timer service
- Build tag management system
- Develop main dashboard interface

### Phase 3: Reporting and Polish
- Implement reporting interface with charts
- Create data export functionality
- Add animations with Framer Motion
- Optimize performance and fix bugs

### Phase 4: Testing and Refinement
- Conduct usability testing
- Refine UI/UX based on feedback
- Optimize for performance
- Ensure data integrity across scenarios

## 10. Technical Implementation Notes

### Background Processing
- Use Tauri commands API for communication between frontend and backend
- Implement system tray functionality for background operation
- Register global shortcuts via Tauri's global shortcut API

### State Management
- Use Zustand for application state management
- Implement repository pattern for data access
- Create custom hooks for UI-data binding

### UI Components
```tsx
// Example component structure for QuickEntryBar
const QuickEntryBar = () => {
  const [description, setDescription] = useState('');
  const [selectedTagId, setSelectedTagId] = useState(defaultTagId);
  const startTimer = useTimerStore(state => state.startTimer);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim()) {
      startTimer(description, selectedTagId);
      setDescription('');
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="quick-entry-container"
    >
      <form onSubmit={handleSubmit}>
        <Input 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What are you working on?"
          autoFocus
        />
        <TagSelector 
          selectedTagId={selectedTagId}
          onSelectTag={setSelectedTagId}
        />
        <Button type="submit">Start</Button>
      </form>
    </motion.div>
  );
};
```

## 11. Testing Strategy

### Unit Testing
- Test core timer functionality
- Validate data storage and retrieval
- Verify tag management operations

### Integration Testing
- Test interaction between timer and storage
- Verify background processing with UI
- Validate report generation logic

### UI Testing
- Test responsiveness and layout
- Verify animations and transitions
- Validate form submissions and user flows

### End-to-End Testing
- Verify complete workflows
- Test background operation
- Validate data integrity across sessions

## 12. Additional Considerations

### Accessibility
- Ensure keyboard navigability
- Maintain sufficient color contrast
- Provide alternative text for visual elements

### Performance
- Optimize render performance for animations
- Efficient data querying for large datasets
- Minimize background process resource usage

### Future Expansion
- Cloud synchronization capabilities
- Team collaboration features
- Integration with project management tools
- Mobile companion application
