import React, { Component } from 'react';
import Mission from './Mission'

class MissionsContainer extends Component {

    renderMissionComponent () {
        var missionComponent=[];
        if(this.props.state && this.props.state.filteredData) {
            var numberOfAllMissionCount = this.props.state ? this.props.state.allLaunch.length : 0
            var numberOfFilteredMissionCount = this.props.state ? this.props.state.filteredData.length : 0    
        }

        //Rendering Missions after user click buttons of filter type 
        if(numberOfFilteredMissionCount > 0 && this.props.state) {
            for(let i=0; i< numberOfFilteredMissionCount; i++){
                missionComponent.push(
                  <Mission 
                  key={i} 
                  value={ this.props.state.filteredData[i] }  />);
                }        
        }
        else {
            //Rendering all missions
            for(let i=0; i< numberOfAllMissionCount; i++){
                missionComponent.push(
                  <Mission 
                  key={i} 
                  value={ this.props.state.allLaunch[i] }  />);
                }        
        }
        return missionComponent;
    }

    render() {
        var launchMissionComponents = this.renderMissionComponent();
        if(this.props.state && this.props.state.filteredData && this.props.state.filteredData.length == 0) {
            return (
                <div className = 'mission-container'>
                    <h3 className="no-data">Data is being fetched... Or, there is no data matching your filters. Please try again!</h3>
                </div>
            );         
        }
        else {
            return (
                <div className = 'mission-container'>
                    {launchMissionComponents}
                </div>
            );    
        }     
    }
}

export default MissionsContainer;