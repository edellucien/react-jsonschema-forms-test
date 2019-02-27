import React, { Component } from 'react';
import './App.css';
import Form from "react-jsonschema-form";

class Item extends Component {
  render() {
    const { item, onClickFunc } = this.props;
    return (
      <li key={item.id} onClick={() => {onClickFunc(item)}}>
        {item.id} - {item.bezeichnung}
      </li>
    );
  }
}

class App extends Component {
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
    this.fetchResults(GET_RESULT);
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

  fetchResults(url) {
    fetch(url, {
      method: 'GET',
    }).then(data => {
      if (data.ok) {
        data.json().then(json => {
          this.setState({
            results: json.results,
          });
        });
      }
    });
  }

  renderResults() {
    const onClickFunc = (item) => {
      this.setState({
        formData: item,
      });
    };
    const listResults = this.state.results.map((item) =>
      <Item key={item.id} item={item} onClickFunc={onClickFunc}/>
    );

    return (
      <div className="App-results-wrapper">
        Results
        <ul>{listResults}</ul>
      </div>
    )
  }

  renderForm() {
    return (
      <div>
        Form:
        <Form
          schema={this.state.schema}
          uiSchema={this.state.uiSchema}
          formData={this.state.formData}
          className="App-form"
        />
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div className="App-form-wrapper">
          {(this.state.results ? this.renderResults() : null)}
          {(this.state.schema ? this.renderForm() : null)}
        </div>
        </header>
      </div>
    );
  }
}

export default App;
