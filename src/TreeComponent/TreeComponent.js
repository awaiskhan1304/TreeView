import React, { useContext, useEffect, useState } from 'react';
import DataContext from '../DataContext';
import './TreeComponent.css'
const TreeComponent = (props) => {
    var data = useContext(DataContext)
    if(!data) { // for testcases
        data = props.data
    }
    const [selected, setSelected] = useState([])
    const [filtered, setFiltered] = useState([])
    useEffect(() => {
        let arr = []
        for(var i=0;i<selected.length;i++) {
            let ele = selected[i]
            let index = arr.findIndex(x=>x.category == ele.category && x.brand == ele.brand && x.model == ele.model)
            if (index < 0) {
                arr.push({...ele})
            } else {
                if(arr[index].variants) {
                    arr[index].variants = arr[index].variants.concat(ele.variants)
                }else{
                    arr[index].variants = [...ele.variants]
                }
            }
        }
        setFiltered(arr)
    },[selected])
    const handleCheckBox = (payload) => {
       let index = selected.findIndex(x => {
            let matched = true
            for(var key in x) {
                if(JSON.stringify(x[key]) != JSON.stringify(payload[key])){
                    matched = false
                }
            }
            for(var key in payload) {
                if(JSON.stringify(x[key]) != JSON.stringify(payload[key])){
                    matched = false
                }
            }
            return matched
       })
       if(index > -1) {
        let updated = [...selected]
        updated.splice(index, 1)
        setSelected(updated)
       } else {
        setSelected(prevArray => [...prevArray, payload])
       }
    }
    return(
        <div style={{width: '100%',display: 'flex',alignItems: 'flex-start',justifyContent: 'flex-start',flexDirection: 'column'}}>
            <div className='checkbox-tree' style={{display: 'flex', width: '20%',height: 600,overflow: 'auto',border: 'none',background: 'lightgrey'}}>
                <ul>
                {data.map((item) => {
                    return (
                    <li>
                        <input type="checkbox" data-testid={`category${item.id}`} id={`category${item.id}`} onChange= {() => handleCheckBox({
                            category: item.name
                        })} />
                        <label data-testid = 'category-name' style = {{color: 'black'}} for={`category${item.id}`} >{item.name}</label>
                        <ul>
                            {item.brands.map((brand) => {
                                return(
                                    <li>
                                        <input type="checkbox" id={`category${item.id}brand${brand.id}`} onChange= {() => handleCheckBox({
                                            category: item.name,
                                            brand: brand.name
                                        })} />
                                        <label data-testid = 'brand-name' style = {{color: 'black'}} for={`category${item.id}brand${brand.id}`}>{brand.name}</label>
                                        <ul>
                                            {brand.models.map((model) => {
                                                return(
                                                    <li>
                                                        <input type="checkbox" id={`category${item.id}brand${brand.id}model${model.id}`} onChange= {() => handleCheckBox({
                                                            category: item.name,
                                                            brand: brand.name,
                                                            model: model.name
                                                        })} />
                                                        <label data-testid = 'model-name' for={`category${item.id}brand${brand.id}model${model.id}`}>{model.name}</label>
                                                        <ul>
                                                            {model.variants.map((variant) => {
                                                                return(
                                                                    <li>
                                                                        <input type="checkbox" id={`category${item.id}brand${brand.id}model${model.id}variant${variant}`} onChange= {() => {
                                                                            let payload = {
                                                                                category: item.name,
                                                                                brand: brand.name,
                                                                                model: model.name,
                                                                                variants: [variant]
                                                                            }
                                                                            handleCheckBox(payload)
                                                                        }} />
                                                                        <label data-testid = 'variant-name' for={`category${item.id}brand${brand.id}model${model.id}variant${variant}`}>{variant}</label>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                )
                            })}
                        </ul>
                    </li>
                    )
                })}
                </ul>
            </div>
            <div style={{ width: '20%',flexShrink: 0, wordBreak: 'break-word' }}>
                {filtered.map((obj) => {
                    let str = ''
                    if(obj.variants) {
                        if (obj.variants.length == 0) {
                            str = `All ${obj.brand} selected`
                        } else {
                            str = `${obj.brand} ${obj.variants.join(',')}`
                        }
                    }else{
                        if(obj.model) {
                            str = `All ${obj.model} selected`
                        } else if (obj.brand) {
                            str = `All ${obj.brand} selected`
                        } else {
                            str = `All ${obj.category} selected`
                        }
                    }
                    return(
                        <label data-testid="result" className='selected' style={{ background: 'grey' }}>{str}</label>
                    )
                })}
            </div>
        </div>
        
    )
}
export default TreeComponent