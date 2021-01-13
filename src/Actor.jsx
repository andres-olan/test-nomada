import React from 'react'
import Context from './Context'
import Axios from 'axios'
import { Button, Card, Col, Divider, Image, Row, Tag } from 'antd'
import { Link } from 'react-router-dom'
import { StarFilled } from '@ant-design/icons'

export default class Actor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            actorDetails:{}
        }
    }

    async componentDidMount() {
        const data = await Axios.get('https://api.themoviedb.org/3/search/person?api_key=30db1237b9167f8afaf9e065b90d16b8&query='+this.context.state)
            .then(function(response) {
                return response
            })

        this.setState({
            actorDetails:data.data
        })
    }

    render() {
        return(
            <div>
                <Row>
                    <Link to='/' component={Button} type={'primary'}>REGRESAR</Link>
                </Row>
                <br/>
                <Card>
                    <Row>
                        <Col span={4}>
                            {
                                Object.keys(this.state.actorDetails).length > 0
                                ?
                                <center>
                                    <Image src={'https://image.tmdb.org/t/p/w500/'+this.state.actorDetails.results[0].profile_path} />
                                    <h3 style={{marginBottom:0}}>{this.state.actorDetails.results[0].name}</h3>
                                    <Tag color="orange" style={{margin:5}}>{this.state.actorDetails.results[0].gender === 1 ? 'Mujer' : 'Hombre'}</Tag>
                                    <h4>Popularidad: {this.state.actorDetails.results[0].popularity}</h4>
                                </center>
                                : null
                            }
                        </Col>
                        <Col span={20} style={{paddingLeft:20}}>
                            <h1>Peliculas</h1>
                            {
                                Object.keys(this.state.actorDetails).length > 0
                                ?
                                <div>
                                    {
                                        this.state.actorDetails.results.map((actor) => {
                                            return(
                                                actor.known_for.map((movie,keyMovie) => {
                                                    return(
                                                        <div key={keyMovie}>
                                                            <Divider style={{marginTop:5, marginBottom:5}} />
                                                            <Row justify="space-between">
                                                                <Col>
                                                                    <h2>{movie.original_title}</h2>
                                                                </Col>
                                                                <Col>
                                                                    <h2>{movie.vote_average+'/10'} <StarFilled style={{color:'yellow'}} /></h2>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col span={3}>
                                                                    <Image src={'https://image.tmdb.org/t/p/w500/'+movie.poster_path} />
                                                                </Col>
                                                                <Col span={21} style={{paddingLeft:20}}>
                                                                    <p style={{fontSize:16}}>{movie.overview}</p>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    )
                                                })
                                            )
                                        })
                                    }
                                </div>
                                : null
                            }
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

Actor.contextType = Context