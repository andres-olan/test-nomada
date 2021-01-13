import React from 'react'
import { Col, message, Row, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import Context from './Context'
import { Redirect } from 'react-router-dom'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect:false
        }
    }
    uploadFile(e) {
        if(e.file.status === 'done'){
            if (e.file.response.error !== '')
            {
                message.error(e.file.response.error)
            }
            else
            {
                this.context.setContext(e.file.response.actorName)
                this.setState({
                    redirect:true
                })
            }
        }
        else if (e.file.status === 'error') {
            message.error('Intente nuevamente')
        }
    }

    render() {
        return(
            this.state.redirect === true
            ?
            <Redirect to='/actor' />
            :
            <Row>
                <Col offset={7} span={10}>
                    <center><h1>¿Quién es este actor?</h1></center>
                    <Upload 
                        name={'file'} 
                        onChange={(e) => this.uploadFile(e)}
                        action={'https://whois.nomada.cloud/upload'}
                        headers={{Nomada:'OTJiMmVjNjQtN2FjNS00ZmQ2LWFkMmMtMjYwMzRiNDIzZDNh'}}
                        accept={'image/png, image/jpeg, image/PNG, image/JPEG'}
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Haz click o arrastra una imagen</p>
                        <p className="ant-upload-hint">Seleccione la foto de un actor famoso para conocer quién es y en qué peliculas a salido</p>
                    </Upload>
                </Col>
            </Row>
        )
    }
}

App.contextType = Context