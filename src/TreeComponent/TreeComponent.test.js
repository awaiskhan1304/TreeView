import { fireEvent, render, screen } from '@testing-library/react';
import TreeComponent from './TreeComponent';
import { mockData } from '../mockData';

test('renders category listing', () => {
  const {getAllByTestId} = render(<TreeComponent data = {mockData}/>);
  const names = getAllByTestId('category-name').map(x=>x.textContent)
  const data = mockData.map(x=>x.name)
  expect(names).toEqual(data)
});
test('renders brands listing', () => {
    const {getAllByTestId} = render(<TreeComponent data = {mockData}/>);
    const names = getAllByTestId('brand-name').map(x=>x.textContent)
    const brands = mockData.map(x=>x.brands)
    let brandNames = []
    for(var i=0;i<brands.length;i++) {
        brandNames = brandNames.concat(brands[i].map(x=>x.name))
    }
    expect(names).toEqual(brandNames)
})
test('renders models listing', () => {
    const {getAllByTestId} = render(<TreeComponent data = {mockData}/>);
    const names = getAllByTestId('model-name').map(x=>x.textContent)
    const brands = mockData.map(x=>x.brands)
    let modelNames = []
    let models = []
    for(var i=0;i<brands.length;i++) {
        models = models.concat(brands[i].map(x=>x.models))
    }
    for(var i=0;i<models.length;i++) {
        modelNames = modelNames.concat(models[i].map(x=>x.name))
    }
    expect(modelNames).toEqual(names)
})
test('renders varient listing', () => {
    const {getAllByTestId} = render(<TreeComponent data = {mockData}/>);
    const names = getAllByTestId('variant-name').map(x=>x.textContent)
    const brands = mockData.map(x=>x.brands)
    let variants = []
    let models = []
    let varientNames = []
    for(var i=0;i<brands.length;i++) {
        models = models.concat(brands[i].map(x=>x.models))
    }
    for(var i=0;i<models.length;i++) {
        variants = variants.concat(models[i].map(x=>x.variants))
    }
    for(var i=0;i<variants.length;i++) {
        varientNames = varientNames.concat(variants[i])
    }
    expect(names).toEqual(varientNames)
})
test('result shown',() => {
    const {getAllByTestId} = render(<TreeComponent data = {mockData}/>);
    const button = screen.getByTestId('category1')
    fireEvent.click(button)
    expect(screen.getByTestId('result')).toBeInTheDocument()
    const selected = getAllByTestId('result').map(x=>x.textContent)
    let category1 = mockData[0]
    selected.forEach(str=>{
        expect(str).toContain(category1.name)
    })
    fireEvent.click(button)
    expect(screen.queryByTestId('result')).toBeNull()
})