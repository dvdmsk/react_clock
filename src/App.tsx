import React from 'react';
import './App.scss';
import { Clock } from './components/Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type Props = {
  props?: object;
};

type State = {
  clockName: string;
  isClock: boolean;
};

export class App extends React.Component<Props, State> {
  state: Readonly<State> = {
    clockName: 'Clock-0',
    isClock: true,
  };

  timerId = 0;

  componentDidMount(): void {
    this.timerId = window.setInterval(() => {
      this.setState({ clockName: getRandomName() });
    }, 3300);

    document.addEventListener('contextmenu', () => {
      this.setState({ isClock: false });
    });

    document.addEventListener('click', () => {
      this.setState({ isClock: true });
    });
  }

  componentWillUnmount(): void {
    window.clearInterval(this.timerId);
  }

  render() {
    return (
      <div className="App">
        <h1>React clock</h1>
        {this.state.isClock && <Clock clockName={this.state.clockName} />}
      </div>
    );
  }
}
