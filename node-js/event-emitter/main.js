var events = require('events');
var eventEmitter = new events.EventEmitter();

// 1. Built-in event hooks
eventEmitter.on('newListener', function(event, listener) {
    console.log("System Hook: New listener registered for '" + event + "'");
});
eventEmitter.on('removeListener', function(event, listener) {
    console.log("System Hook: Listener removed from '" + event + "'");
});
eventEmitter.on('error', function(err) {
    console.log("Error Safely Handled: " + err);
});

// 2. Event-driven flow
var onDataReceived = function() {
    console.log("Action 1: Data Received.");
    eventEmitter.emit('process_data');
};

var onProcessData = function() {
    console.log("Action 2: Processing Data");
    eventEmitter.emit('save_complete');
};

var onSaveComplete = function() {
    console.log("Action 3: Save Complete.");
};

// 3. Custom event listeners
eventEmitter.on('data_received', onDataReceived);
eventEmitter.on('process_data', onProcessData);
eventEmitter.on('save_complete', onSaveComplete);



// 4. Multiple listeners
eventEmitter.on('save_complete', function() {
    console.log("Action 3: Sending success notification.");
});

console.log("\nExecuting Event Flow");


// 5. Emit the custom event manually
eventEmitter.emit('data_received');

console.log("\nTesting Built-in Error Event");
eventEmitter.emit('error', "Failing component");


// 6. Clean up by removing specific listeners
eventEmitter.removeListener('data_received', onDataReceived);
console.log("\nRe-testing Event Flow After Cleanup");
var hasListeners = eventEmitter.emit('data_received');
if (!hasListeners) {
    console.log("No listeners responded to 'data_received'.");
}