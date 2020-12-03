import react, {Component} from 'react'
import FiltersContainer from './FilterComponents/FiltersContainer'
import MissionsContainer from './FilteredDataDisplayComponents/MissionsContainer' 
import * as ConstantsFile from './Constants'

class App extends Component {

    
    constructor () {
    super()

    // Creating a state that will be filled with the data fetched
    // from API
    this.state = {
      allLaunch : [],
      launchYears: [],
      filteredData: []
    }

  }
  
  //Method that will retrieve and return the numbers of distinct years of SpaceX mission
  getLaunchYears (launchData) {
    let rockets = launchData.map((rocket) => rocket.launch_year)
    var launchYears = [];
    rockets.forEach((rocket) => {
      if(!launchYears.includes(rocket)){
       launchYears.push(rocket)
      }
    })
    return launchYears
  }

  //Callback method received from child component.
  //It will set state of number of rockets sent on a year user has clicked
  filterSelectionReceived = (filteredrocketsListObject) => {
    this.setState({
      filteredData: filteredrocketsListObject,
    })
  }

  componentDidMount() {
    fetch(ConstantsFile.API)
    .then(x => x.json())
    .then((launchData) => {
      var launchYears = this.getLaunchYears(launchData)       
      this.setState({
        allLaunch : launchData,
        launchYears: launchYears,
        filteredData:launchData
      })
    }
  )
}  

render() {
    return (
    <div className="App">
      <header>SpaceX Launch Programs</header>
      <FiltersContainer state = {this.state} parentCallBack = {this.filterSelectionReceived}/>
      <MissionsContainer state = {this.state}/>
      <footer>Developed by Paritosh Louhan</footer>
    </div>
    );
  }
}

export default App;
