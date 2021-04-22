import { Collapse, PageHeader, Tabs, Spin } from "antd";
import React, { useEffect, useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import "./Detalhe.css";
import { endpoint } from "../common/constantes";

const { TabPane } = Tabs;
const { Panel } = Collapse;

const Detalhe = ()=>{
    const [title, setTitle] = useState("");
    const [cases, setCases] = useState({});
    const [vaccines, setVaccines] = useState({});

    const [loadingCases, setLoadingCases] = useState(false);
    const [loadingVaccines, setLoadingVaccines] = useState(false);
    
    const params = useParams();
    const history = useHistory();

    async function getCasos(){
        if(Object.keys(cases).length === 0) {
            setLoadingCases(true);
            const res = await axios.get(`${endpoint}/cases?country=${params.pais}`);
            if(res.status === 200){
                setCases(res.data);
            }
            setLoadingCases(false);
        }
    }

    async function getVacinacao(){
        if(Object.keys(vaccines).length === 0) {
            setLoadingVaccines(true);
            const res = await axios.get(`${endpoint}/vaccines?country=${params.pais}`);
            if(res.status === 200){
                setVaccines(res.data);
            }
            setLoadingVaccines(false);
         }
    }

    function onChangeTab(activitiKey){
        if(activitiKey === "1" ) getCasos();
        if(activitiKey === "2" ) getVacinacao();
    }

    useEffect(()=>{
        getCasos();  
    }, []);

    useEffect(()=>{
        if(params.pais){
            setTitle(params.pais);
        }
    }, [params]);
    
    return(
    <div>
        <PageHeader className="site-page-header" onBack={() => history.goBack()} title={title}subTitle="Casos e Vacinação" /> 
        
        <Tabs onChange={onChangeTab} defaultActiveKey="1">
            <TabPane tab="Casos" key="1" style={{minHeight: 100}}>
                <Spin spinning={loadingCases}>
                    <Collapse accordion defaultActiveKey={["0"]}>
                        {Object.keys(cases).map(item => {
                            const obj = cases[item];
                            return (                                   
                                <Panel header={item} key={item.index}>
                                    <p>
                                        <b>Confirmados: </b>{obj.confirmed}
                                    </p>
                                    <p>
                                        <b>Mortes: </b>{obj.deaths}
                                    </p>
                                    <p>
                                        <b>Recuperados: </b>{obj.recovered}
                                    </p>
                                </Panel>   
                            );
                        })}
                    </Collapse>
                </Spin>
            </TabPane>
            <TabPane tab="Vacina" key="2">
            <Spin spinning={loadingVaccines}>
                    <Collapse accordion defaultActiveKey={["0"]}>
                        {Object.keys(vaccines).map(item => {
                            const obj = vaccines[item];
                            return (                                   
                                <Panel header={item} key={item.index}>
                                    <p>
                                        <b>População: </b>{obj.population}
                                    </p>
                                    <p>
                                        <b>Expectativa de Vida: </b>{obj.life_expectancy} %
                                    </p>
                                    <p>
                                        <b>Pessoas Vacinadas: </b>{obj.people_vaccinated}
                                    </p>
                                    <p>
                                        <b>Pessoas Parcialmente Vacinadas: </b>{obj.people_partially_vaccinated}
                                    </p>
                                  
                                </Panel>   
                            );
                        })}
                    </Collapse>
                </Spin>
            </TabPane>
        </Tabs>
    
    
    </div>
    );
};

export default Detalhe;