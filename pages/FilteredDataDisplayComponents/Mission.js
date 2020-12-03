import React, { Component } from 'react';
import * as ConstantsFile from '../Constants'

class Mission extends Component {

    //Converting the list into a string
    getMissionIdsList () {
        var idsList = ""
        var missionIdsLength = this.props.value ? this.props.value.mission_id.length : 0        
        if(missionIdsLength > 0) {
            for(var i=0; i < missionIdsLength; i++) {
                idsList +=  " " +this.props.value.mission_id[i]
            }    
        }
        else {
            idsList = ConstantsFile.NO_ID
        }
        return idsList
    }

    render() {
        //Check implementation if no data is received in api response
        var landValue;
        if(this.props.value)
        {
            var launchValue = this.props.value.launch_success == true ? ConstantsFile.TRUE : ConstantsFile.FALSE
            if(this.props.value.rocket.first_stage.cores[0].land_success == true) {
                landValue = ConstantsFile.TRUE
            }
            else if(this.props.value.rocket.first_stage.cores[0].land_success == false) {
                landValue = ConstantsFile.FALSE
            }
            else {
                landValue = ConstantsFile.NULL
            }
            var idsList = this.getMissionIdsList()
            var imageLink = this.props.value.links.mission_patch_small
            var missionName = this.props.value.mission_name 
            var launchYear = this.props.value.launch_year 
            return (
                <div className = 'mission'>
                    <img src={imageLink} alt='spaceX Logo'></img>
                    <header className='mission-name'>{missionName}</header>
                    <label className='text'>Mission ids: </label> 
                    <label className='value'>{idsList}</label>
    
                    <label className='text'>Launch Year : </label>
                    <label className='value'>{launchYear}</label>
    
                    <label className='text'>Successful Launch : </label> 
                    <label className='value'>{launchValue}</label>
    
                    <label className='text'>Successful Land : </label> 
                    <label className='value'>{landValue}</label>
                </div>
            );  
        }
        else {
            return <label>No Data received!</label>
        }
        
    }
}

export default Mission;