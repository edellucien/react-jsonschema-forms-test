import React, { Component } from 'react';
import './App.css';
import Form from "react-jsonschema-form";

class FormWrapper extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      schema: {},
      uiSchema: {},
      formData: {},
    };

    const GET_SCHEMA = '/api/infofpw/messtisch/form/';
    const GET_RESULT = `${GET_SCHEMA}?format=json`;

    this.fetchSchema(GET_SCHEMA);
    this.fetchResult(GET_RESULT);
  }

  fetchSchema(url) {
    fetch(url, {
      method: 'OPTIONS',
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            schema: json.schema,
            uiSchema: json.ui,
          });
          ;
        })
      }
    })
  }

  fetchResult(url) {
    fetch(url, {
      method: 'GET',
    }).then(data => {
      if (data.ok) {
        data.json().then(json => {
          this.setState({
            results: json.results,
            formData: json.results[0],
          });
        });
      }
    });
  }

  render() {
    if (this.state.formData) {
      const listResults = this.state.results.map((item) =>
        <li key={item.id}>{item.id} - {item.bezeichnung}</li>);

      return (
        <div className="App-form-wrapper">
          <div className="App-results-wrapper">
            Results:
            <ul>{listResults}</ul>
          </div>

          Form:
          <Form
            schema={this.state.schema}
            uiSchema={this.state.uiSchema}
            formData={this.state.formData}
            className="App-form"
          />
        </div>
      );
    }
    return null;
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <FormWrapper />
        </header>
      </div>
    );
  }
}

export default App;
