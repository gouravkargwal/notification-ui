const express = require("express");
const cors = require("cors");
const app = express();
const port = 9000;

app.use(cors());

// Mock database of schemas for different notification types
const schemas = {
  upload: {
    layout: "singleColumn",
    fields: [
      {
        type: "text",
        value: "File {fileName} was successfully {status}",
      },
    ],
  },
  invite: {
    layout: "singleColumn",
    fields: [
      {
        type: "text",
        value: "{user} has been invited to {project}",
      },
    ],
  },
  workflow: {
    layout: "twoColumn",
    fields: [
      {
        type: "text",
        value: "Workflow {workflowName} is now {status}",
      },
      {
        type: "text",
        value: "Started on {startDate}, ended on {endDate}",
      },
    ],
  },
};

// Function to simulate random notification data
const getRandomNotificationData = (type) => {
  const mockData = {
    upload: {
      fileName: "document.pdf",
      status: "uploaded",
    },
    invite: {
      user: "John Doe",
      project: "Awesome Project",
    },
    workflow: {
      workflowName: "Approval Process",
      status: "completed",
      startDate: "2023-10-01",
      endDate: "2023-10-04",
    },
  };

  return mockData[type];
};

// API endpoint to get a random schema and data
app.get("/notification", (req, res) => {
  const types = ["upload", "invite", "workflow"];

  // Randomly pick a notification type
  const randomType = types[Math.floor(Math.random() * types.length)];

  // Get the corresponding schema and data
  const notificationSchema = schemas[randomType];
  const notificationData = getRandomNotificationData(randomType);

  // Send the response
  res.json({
    type: randomType,
    data: notificationData,
    schema: notificationSchema,
  });
});

// Start the server
app.listen(port, () => {
  console.log(
    `Notification Schema Service running on http://localhost:${port}`
  );
});
