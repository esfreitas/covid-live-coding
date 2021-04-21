import { PageHeader, Tabs } from "antd";
import React, { useEffect, useState} from "react";
import { useHistory, useParams } from "react-router-dom";

import "./Detalhe.css";

const { TabPane } = Tabs;

const Detalhe = ()=>{
    const [title, setTitle] = useState("");
    

    const params = useParams();
    const history = useHistory();

    useEffect(()=>{
        if(params.pais){
            setTitle(params.pais);
        }
    }, [params]);
    
    return(
    <div>
        <PageHeader className="site-page-header" onBack={() => history.goBack()} title={title}subTitle="Casos e Vacinação" />
        
        <Tabs defaultActiveKey="1">
            <TabPane tab="Casos" key="1">
                Content of Tab
            </TabPane>
            <TabPane tab="Vacina" key="2">
                Content of Tab
            </TabPane>
        </Tabs>
    
    
    </div>
    );
};

export default Detalhe;