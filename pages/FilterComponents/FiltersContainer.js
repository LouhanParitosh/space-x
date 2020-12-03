import React, { Component } from 'react';
import FilterButton from './FilterButton';
import * as ConstantsFile from '../Constants'

class FiltersContainer extends Component {

    //Created a hardcoded filtering state in boolArray
    constructor () {
        super()
        this.boolArray = [true, false]
        this.state = {
            filterSelectedYearData: []
        }
        this.selectedFilters = []
    }

    //Creating a data store to contain currently selected filters
    addRemoveFilterSelection(filter, moduleName) {
        var currentFilterSelection = {moduleName : moduleName, filter: filter}
        var isSelectedFilterAlreadyPresent = this.selectedFilters.filter(filterObject => (filterObject.moduleName == moduleName && filterObject.filter == filter))
        var isDifferentFilterOfSameModule = this.selectedFilters.filter(filterObject => (filterObject.moduleName == moduleName && filterObject.filter != filter))
        if(isSelectedFilterAlreadyPresent.length > 0){
            var removeIndex = this.selectedFilters.map(filterObject => (filterObject.moduleName)).indexOf(currentFilterSelection.moduleName)
            this.selectedFilters.splice(removeIndex, 1);
        }
        else if(isDifferentFilterOfSameModule.length > 0) {
            var removeIndex = this.selectedFilters.map(filterObject => (filterObject.moduleName)).indexOf(currentFilterSelection.moduleName)
            this.selectedFilters.splice(removeIndex, 1);
            this.selectedFilters.push(currentFilterSelection)
        }
        else {
            this.selectedFilters.push(currentFilterSelection)
        }
    }
    
    //Common method that will be called after user clicks on any filter type
    //This method will callback the parent
    afterFiltering() {
        this.props.parentCallBack(this.state.filterSelectedYearData)
        this.setStyling()
    }

    //Setting selected classes from section wise filtering
    setStyling() {
        if(this.selectedFilters.length > 0) {
            for(var i = 0; i< this.selectedFilters.length ; i++){
                var filterType = this.selectedFilters[i].filter
                switch(this.selectedFilters[i].moduleName) {
                    case ConstantsFile.FILTER_SELECTION_TYPE_Year : 
                    var elems = document.querySelectorAll(".launch-year");  
                    break
                    case ConstantsFile.FILTER_SELECTION_TYPE_LAUNCHING : 
                    var elems = document.querySelectorAll(".launch");
                    break
                    case ConstantsFile.FILTER_SELECTION_TYPE_LANDING : 
                    var elems = document.querySelectorAll(".landing");
                    break
                }
                this.removeSelectedClassFromAllChildComponents(elems, filterType, true)
            }
        }
        else {
            var elemsAllSection = document.querySelectorAll(".launch-year, .launch, .landing");
            this.removeSelectedClassFromAllChildComponents(elemsAllSection, null, false)
        }

    }

    //Removing unnecessary classs on DOM
    removeSelectedClassFromAllChildComponents (elems, filterType, clearSection) {
        if(clearSection) {
            [].forEach.call(elems, function(el) {
                if(el.innerText.toLowerCase().toString() != filterType.toString()) {
                    el.children[0].classList = '';
                }
            });    
        }
        else {
            [].forEach.call(elems, function(el) {
                el.children[0].classList = '';
            });
        }
    }

    //Rendering complete data
    renderSetState(filteredrocketsList) {
        this.setState({
            filterSelectedYearData : filteredrocketsList
        }, () => {
            this.afterFiltering()
        }); 
    }

    //Callback method if user clicked on any year button
    //This method will filter all missions of particular year on which user has clicked
    filterSelectedYearData = (selectedYear) => {
        this.addRemoveFilterSelection(selectedYear, ConstantsFile.FILTER_SELECTION_TYPE_Year)
        this.renderCompleteFilteredData()
    }

    //Callback method if user clicked on any Launch type button
    //This method will filter all missions of particular launch on which user has clicked
    filterSelectedLaunchType = (selectedType) => {
        this.addRemoveFilterSelection(selectedType, ConstantsFile.FILTER_SELECTION_TYPE_LAUNCHING)
        this.renderCompleteFilteredData()
    }

    //Callback method if user clicked on any Land type button
    //This method will filter all missions of particular land on which user has clicked
    filterSelectedLandingType = (selectedType) => {
        this.addRemoveFilterSelection(selectedType, ConstantsFile.FILTER_SELECTION_TYPE_LANDING)
        this.renderCompleteFilteredData()
    }

    renderCompleteFilteredData () {
        var filteredrocketsList =this.props.state.allLaunch, filteredrockets;
        for(var i = 0; i< this.selectedFilters.length ; i++){
            switch(this.selectedFilters[i].moduleName) {
                case ConstantsFile.FILTER_SELECTION_TYPE_Year : 
                filteredrockets = filteredrocketsList.filter((rocket) => {return rocket.launch_year == this.selectedFilters[i].filter})
                break
                case ConstantsFile.FILTER_SELECTION_TYPE_LAUNCHING : 
                filteredrockets = filteredrocketsList.filter((rocket) => {return rocket.launch_success == this.selectedFilters[i].filter})
                break
                case ConstantsFile.FILTER_SELECTION_TYPE_LANDING : 
                filteredrockets = filteredrocketsList.filter((rocket) => {return rocket.rocket.first_stage.cores[0].land_success == this.selectedFilters[i].filter})
                break
            }
            filteredrocketsList = filteredrockets
        }
        this.renderSetState(filteredrocketsList)
    }

    

    //Method will render all years button component
    renderLaunchYearComponent () {
        var launchYearsComponents=[];
        var numberOfButtons = this.props.state ? this.props.state.launchYears.length : 0
        for(var i=0; i < numberOfButtons; i++){
          if(this.selectedFilters.filter(filter => (filter.filter == filter)))
          launchYearsComponents.push(
          <FilterButton 
          key={i} 
          actualValue={ this.props.state.launchYears[i] } 
          value={ this.props.state.launchYears[i] } 
          parentCallBack = {this.filterSelectedYearData}
          className = 'launch-year' />);
        }
        return launchYearsComponents;
    }

    //Method will render successful Launch button components
    renderSuccessfulLaunchComponent () {
        var launchComponent=[];
        var boolStringArray = [ConstantsFile.TRUE, ConstantsFile.FALSE]
        for(var i=0; i<this.boolArray.length; i++){
        launchComponent.push(
          <FilterButton 
          key={i}
          actualValue = {this.boolArray[i]} 
          value={ boolStringArray[i] } 
          parentCallBack = {this.filterSelectedLaunchType}  
          className = 'launch'/>);
        }
        return launchComponent;
    }

    //Method will render successful Land button components    
    renderSuccessfulLandingComponent () {
        var landingComponent=[];
        var boolStringArray = [ConstantsFile.TRUE, ConstantsFile.FALSE]
        for(var i=0; i< this.boolArray.length; i++){
        landingComponent.push(
          <FilterButton 
          key={i} 
          actualValue = {this.boolArray[i]}
          value={ boolStringArray[i] } 
          parentCallBack = {this.filterSelectedLandingType} 
          className = 'landing'/>);
        }
        return landingComponent;
    }

    //Removing all filters from the page
    removeAllFilters = () => {
        this.selectedFilters = []        
        this.setState({
            filterSelectedYearData : this.props.state.allLaunch
        }, () => {
            this.afterFiltering()
        })
    }

    render() {
        var launchYearsComponents = this.renderLaunchYearComponent();
        var successfulLaunchComponent = this.renderSuccessfulLaunchComponent();
        var successfulLandingComponent = this.renderSuccessfulLandingComponent();
        var totalCount = this.state.filterSelectedYearData.length == 100 ? 0 : this.state.filterSelectedYearData.length
        return (
            <div className = 'filter-container'>
                <heading className = 'filter-container-heading'>Filters</heading> 
                <a className = 'refresh-all' href="#" onClick={this.removeAllFilters}>Reset filters</a>
                <label className='heading'>Launch Year</label>
                {launchYearsComponents}
                <label className='heading'>Successful Launch</label>
                {successfulLaunchComponent}
                <label className='heading'>Successful Landing</label>
                {successfulLandingComponent}
                <label className="filter-count">Total Filter Result Count :  </label><label>{" " +totalCount}</label>
            </div>
        );
    }
}

export default FiltersContainer;