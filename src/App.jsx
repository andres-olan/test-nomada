import React from 'react';
import {createBrowserHistory} from 'history'
import {Router,Switch,Route} from 'react-router-dom'
import UploadFile from './UploadFile'
import Actor from './Actor'
import { Provider } from './Context';

const BrowserHistory = createBrowserHistory()

export default class App extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            actor:{}
        }
        this.updateContext = this.updateContext.bind(this)
    }

    updateContext(data) {
        this.setState({
          actor:data
        })
    }

    render()
    {
        return(
            <Router history={BrowserHistory}>
                <Provider value={{state:this.state.actor,setContext:this.updateContext}}>
                  <Switch>
                    <Route exact path={'/'} component={UploadFile} />
                    <Route exact path={'/actor'} component={Actor} />
                  </Switch>
                </Provider>
            </Router>
        )
    }
}