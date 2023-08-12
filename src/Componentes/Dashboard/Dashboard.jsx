import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ContextUser } from '../Context/StateUsersGlobals'
import RateControl from '../RateControl/RateControl'
import SideBar from '../Sidebar/Sidebar'
import TrendControl from '../TrendControl/TrendControl'
import TrendControlByMonth from '../TrendControlByMonth/TrendControlByMonth'
import TrendControlByYear from '../TrendControlByYear/TrendControlByYear'
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function Dashboard(){

    return (
        <ContextUser>
             <BrowserRouter>
              <Container fluid >
                <Row>
                <Col md={3} className="p-0"><SideBar></SideBar></Col>
                <Col md={9}>
                <Routes>
                    <Route exact path="rateControl" element={<RateControl />} />
                    
                    <Route exact path="trendControl" element={<TrendControl />} />
                   
                    <Route exact path="trendControlByMonth" element={<TrendControlByMonth />} />
                    <Route exact path="trendControlByYear" element={<TrendControlByYear />} />
                    
                    
                </Routes>
                </Col>
                </Row>
                </Container>
            </BrowserRouter>
        </ContextUser>
    )

}
export default Dashboard