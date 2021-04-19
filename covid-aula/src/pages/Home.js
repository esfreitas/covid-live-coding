import {Form, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {endpoint} from '../common/constantes';

const Home = () => {

    const [loading, setLoading] = useState(false);
    const [paises, setPaises] = useState([]);

    async function getPaises(){
        setLoading(true);
        const res = await axios.get(`${endpoint}/cases`);
        if(res.status === 200){
            console.log(res.data);
            setPaises(Object.keys(res.data));
        }
        setLoading(false);
    }
    
    useEffect(() => {
        getPaises();
    }, []);



    return(
        <div>
            <Form>
                <Form.Item name="pais" rules={[{ required: true, message: "Campo Obrigatório!" }]}>
                    <Select loading={loading}>
                        <Select.Option>Selecione</Select.Option>
                        {paises.map(pais => (
                            <Select.Option key={pais} value={pais}>{pais}</Select.Option>
                            ))}
                    </Select>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Home;