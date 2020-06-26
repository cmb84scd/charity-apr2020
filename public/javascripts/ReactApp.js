class ReactApp extends React.Component {

  render() {
    return(
      <div>
        <h1>Hello</h1>
        <MemberForm updatemethod={this.updateState}/>
        <DriverList updatemethod={this.updateState}/>
        <GuestList />
        <Pairing/>
      </div>
    );
  }
}

ReactDOM.render(<ReactApp />, document.getElementById('root'));
