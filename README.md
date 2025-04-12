# Greeter Component for Third-Party Integration

A self-contained Vue.js component that can be embedded in third-party applications using a simple script tag.

## Features

- Standalone component with no dependencies required by the host application
- Customizable message and button text
- Visual feedback with toast notifications
- Self-contained styles that don't conflict with host application styles
- Uses Pinia for state management
- Thoroughly tested

## Installation

### 1. Add the component to your HTML

```html
<script src="greeter-component.js"></script>
<div id="my-component"></div>
<script>
  Greeter.init("#my-component", {
    message: "Hello from the host app!",
    buttonText: "Click me", // Optional
  });
</script>
```

### 2. Customization Options

The component accepts the following options:

- `message` (String): The message to print when the button is clicked
- `buttonText` (String): Custom text for the button (optional)
- `toastDuration` (Number): Duration in milliseconds for which the toast notification is displayed (default: 3000)

## Development

### Prerequisites

- Node.js (v23.6.1 or later recommended)
- npm

### Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development Server

Run the development server to test the component:

```bash
npm run dev
```

This will start a development server at http://localhost:9000 with a demo page showing the component in action.

### Building for Production

Build the component for production:

```bash
npm run build
```

This will generate `greeter-component.js` in the `dist` directory.

### Running Tests

Run the tests:

```bash
npm test
```

Run the tests in watch mode:

```bash
npm run test:watch
```

## Architecture

### Virtual DOM

This component uses Vue's Virtual DOM for rendering. The Virtual DOM was chosen because:

1. **Performance**: Vue's Virtual DOM efficiently updates only the parts of the real DOM that need to change, resulting in better performance.
2. **Simplicity**: The Virtual DOM abstraction makes it easier to manage component state and updates.
3. **Cross-browser compatibility**: Vue handles browser differences internally, making the component more reliable across different environments.

### State Management

The component uses Pinia for state management, which provides:

1. **Reactivity**: Changes to the state automatically trigger UI updates
2. **Developer Tools**: Pinia integrates with Vue DevTools for better debugging
3. **Simplicity**: Pinia's store pattern is simple and intuitive

## License

ISC
