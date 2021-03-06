import React, { Component } from 'react';
import { css } from 'styled-components';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';
import { createComponent } from '../utils';

const getTransitionStyle = (state: TransitionStatus, duration: number) => {
  switch (state) {
    case 'exited':
      return css`
        display: none;
      `;

    case 'entering':
    case 'exiting':
      return css`
        transition: height ${duration}ms ease-in-out;
        overflow: hidden;
      `;

    default:
      return css``;
  }
};

const Container = createComponent<{ state: TransitionStatus; height: number; duration: number }>({
  name: 'Collapse',
  style: ({ duration, height, state }) => css`
    position: relative;
    height: ${height}px;

    ${getTransitionStyle(state, duration)};
  `,
});

const Trigger = createComponent({
  name: 'CollapseTrigger',
});

interface CollapseProps {
  isOpen?: boolean;
  duration?: number;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onEntering?: (node: HTMLElement, isAppearing: boolean) => void;
  onEntered?: (node: HTMLElement, isAppearing: boolean) => void;
  onExit?: (node: HTMLElement) => void;
  onExiting?: (node: HTMLElement) => void;
  onExited?: (node: HTMLElement) => void;
  trigger?: React.ReactNode;
  renderTrigger?: (p: { toggle: () => void }) => React.ReactNode;
}

interface CollapseState {
  isOpen: boolean;
  height: number;
}

/** Collapse is used to show and hide content. Use a button, anchor, or other clickable elements as triggers. */
export default class Collapse extends Component<CollapseProps, CollapseState> {
  static defaultProps = {
    duration: 175,
    onEnter: () => {},
    onEntering: () => {},
    onEntered: () => {},
    onExit: () => {},
    onExiting: () => {},
    onExited: () => {},
  };

  static getDerivedStateFromProps(props: CollapseProps, state: CollapseState) {
    if (props.isOpen !== undefined && props.isOpen !== state.isOpen) {
      return {
        ...state,
        isOpen: props.isOpen,
      };
    }

    return null;
  }

  state = {
    isOpen: this.props.isOpen || false,
    height: 0,
  };

  onEnter = (node: HTMLElement, isAppearing: boolean) => {
    this.props.onEnter!(node, isAppearing);
  };

  onEntering = (node: HTMLElement, isAppearing: boolean) => {
    this.setState({ height: node.scrollHeight });
    this.props.onEntering!(node, isAppearing);
  };

  onEntered = (node: HTMLElement, isAppearing: boolean) => {
    this.setState({ height: node.scrollHeight });
    this.props.onEntered!(node, isAppearing);
  };

  onExit = (node: HTMLElement) => {
    this.setState({ height: node.scrollHeight });
    this.props.onExit!(node);
  };

  onExiting = (node: HTMLElement) => {
    // Taken from: https://github.com/reactstrap/reactstrap/blob/master/src/Collapse.js#L80
    this.setState({ height: 0 });
    this.props.onExiting!(node);
  };

  onExited = (node: HTMLElement) => {
    this.props.onExited!(node);
  };

  toggle = () => {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }));
  };

  renderTrigger() {
    const { trigger, renderTrigger } = this.props;

    if (renderTrigger) {
      return renderTrigger({ toggle: this.toggle });
    }
    if (trigger) {
      return <Trigger onClick={this.toggle}>{trigger}</Trigger>;
    }

    return null;
  }

  render() {
    const { duration, children, ...props } = this.props;
    const { height, isOpen } = this.state;

    return (
      <>
        {this.renderTrigger()}

        <Transition
          {...props}
          in={isOpen}
          timeout={duration!}
          onEnter={this.onEnter}
          onEntering={this.onEntering}
          onEntered={this.onEntered}
          onExit={this.onExit}
          onExiting={this.onExiting}
          onExited={this.onExited}>
          {state => (
            <Container state={state} height={height} duration={duration!}>
              {children}
            </Container>
          )}
        </Transition>
      </>
    );
  }
}
