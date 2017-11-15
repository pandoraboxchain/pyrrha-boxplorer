import React, { PureComponent } from 'react';

import './Workers.css';

class Workers extends PureComponent {
  render() {
    const props = this.props;
    const result = props.example && props.example.result ? props.example.result : null;

    if (result && result.size && result.size > 0) {
      const serialized = result.toJS();
      return (
        <div className="WorkersOutput">
          <pre>
            {JSON.stringify(result.toJS(), undefined, 2)}
          </pre>
          <h1>{serialized.title}</h1>
        </div>


      );
    }
    return <div />;
  }
}

export default Workers;
