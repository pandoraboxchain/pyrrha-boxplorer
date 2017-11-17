import React, { PureComponent } from 'react';

import './Example.css';

class Example extends PureComponent {
  render() {
    const props = this.props;
    const result = props.example && props.example.result ? props.example.result : null;

    if (result && result.size && result.size > 0) {
      const serialized = result.toJS();
      return (
        <div className="exampleOutput">
          <h1>Let&apos;s Get <span className="emphsize">Started</span></h1>
          <p>If you see this screen, it means you are all setup \o/</p>
          <p>The following JSON are showing contents coming from Redux, Saga and Config.</p>
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

export default Example;
