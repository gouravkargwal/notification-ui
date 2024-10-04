import React, { useEffect, useState } from 'react';

import axios from 'axios';

function App() {
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:9000/notification')
      .then(response => {
        setNotification(response.data);
      })
      .catch(error => {
        setError('Error fetching notification');
        console.error(error);
      });
  }, []);

  const renderFields = (fields, data) => {
    return fields.map((field, index) => {
      if (field.type === 'text') {
        const renderedValue = field.value.replace(/{(\w+)}/g, (_, key) => data[key] || '');
        return <p key={index}>{renderedValue}</p>;
      }
      return null;
    });
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!notification) {
    return <div>Loading...</div>;
  }

  const { type, data, schema } = notification;

  return (
    <div className="App">
      <h1>Notification Type: {type}</h1>
      <div className={`notification ${schema.layout}`}>
        {renderFields(schema.fields, data)}
      </div>
    </div>
  );
}

export default App;
