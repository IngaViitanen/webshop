import React, { useContext, useState, useEffect } from "react";
import { MyGlobalContext } from "../../context/Context";
import { CartItem, Products } from "../../models/Products";
import "./ProductList.css"

import Card from "../card/Card"

import goggle1 from "../../images/goggles1.jpg"
import goggle2 from "../../images/goggles2.jpg"
import goggle3 from "../../images/goggles3.jpg"
import goggle4 from "../../images/goggles4.jpg"
import goggle5 from "../../images/goggles5.jpg"
import goggle6 from "../../images/goggles6.jpg"
import goggle7 from "../../images/goggles7.jpg"
import Details from "../card/Details";



const data: Products[] = [
    {
        id: 'idid1',
        image: goggle1,
        productName: 'Icy Blue',
        description: 'Ski goggles with an icy blue color hue. Perfect for skiing in any weather and great for protecting your eyes from the snow. Ski fast and look amazing!',
        price: 299,
        facts: [
                'Color: Icy Blue',
                'Size: adjustable',
                'UV-protection: yes'
                ],
        quantity: 5,
        
    },
    {
        id: 'idid2',
        image: goggle2,
        productName: 'Rosé Camo',
        description: 'Ski goggles with a rosé tint and camouflage band. Perfect for skiing in any weather and great for protecting your eyes from the snow. Ski fast and look amazing!',
        price: 299,
        facts: [
                'Color: Rosé Camo',
                'Size: adjustable',
                'UV-protection: yes'
                ],
        quantity: 5,
        
    },
    {
        id: 'idid3',
        image: goggle3,
        productName: 'Pink Skier',
        description: 'Ski goggles with a pink tinted hue. Perfect for skiing in any weather and great for protecting your eyes from the snow. Ski fast and look amazing!',
        price: 299,
        facts: [
                'Color: Pink',
                'Size: adjustable',
                'UV-protection: yes'
                ],
        quantity: 5,
        
    },
    {
        id: 'idid4',
        image: goggle4,
        productName: 'Silver Filmer',
        description: 'Ski goggles in stainless steel with cameras. Are you a real badass in the slopes? But always find yourself struggling to catch your flips and wolts on camera? Well we have just the stuff for you! This camera goggle hybrid connects to your phone by ease and has a battery life of 6 hours! Never miss the perfect shot ever again!',
        price: 599,
        facts: [
                'Color: Silver',
                'Size: not adjustable',
                'UV-protection: yes'
                ],
        quantity: 5,
        
    },
    {
        id: 'idid5',
        image: goggle5,
        productName: 'Sunset goggles',
        description: 'Ski goggles with a multicolored orange tinted hue. Has a multicolored band. Perfect for skiing in any weather and great for protecting your eyes from the snow. Ski fast and look amazing!',
        price: 299,
        facts: [
                'Color: Mulitcolor',
                'Size: adjustable',
                'UV-protection: yes'
                ],
        quantity: 5,
        
    },
    {
        id: 'idid6',
        image: goggle6,
        productName: 'Sunnies',
        description: 'Sunglasses with a greenblue hue. Perfect for when the season is over but you still want to keep the amazing look of a skier!',
        price: 199,
        facts: [
                'Color: greenblue',
                'Size: not adjustable',
                'UV-protection: yes'
                ],
        quantity: 5,
        
    },
    {
        id: 'idid7',
        image: goggle7,
        productName: 'Icy Sunset Bundle',
        description: 'Ski goggles with an icy blue color hue and goggles with a multicolored orange tinted hue. Do you and your partner in crime want to match and look awesome together? Then this bundle is perfect for you!',
        price: 399,
        facts: [
                'Color: Bundle',
                'Size: adjustable',
                'UV-protection: yes'
                ],
        quantity: 5,
    
    },
]

const ProductList = () => {
    const [productsData, setProductsData] = useState<Products[]>(data)
    const [cartitem, setCartitem] = useState<CartItem>()
    const {products, setProducts} = useContext(MyGlobalContext)
    const [searchVal, setSearchVal] = useState('')
    const [showDet, setShowDet] = useState(false)
    const [showList, setShowList] = useState(true)
    const [chosenId, setChosenId] = useState('')
    const chosenProduct = productsData.find(product => product.id === chosenId)
    
    const updateProduct = (updated: Products) => {
        console.log('update product....', updated)

        setProductsData(
        productsData.map((p) => p.id === updated.id ? updated : p) 
        )
        
    }

    useEffect( () => {
        localStorage.setItem('products', JSON.stringify(productsData))
        // setProducts(productsData)
        // console.log(products)
    }, [productsData])

    console.log("products are..........", productsData)
   

    useEffect( () => {
        let storage: [] = []
        const allProducts = localStorage.getItem('products')
        if (allProducts !== null) {
            try {
                storage = JSON.parse(allProducts)
                // setQuant(JSON.parse(localStorage.getItem('products') || '').quantity)
                // console.log('.......................',quant)
                setProductsData(storage)
                setProducts(storage)
            } catch (e) { console.log('error') }
        }
	}, [setProductsData])

    const detailsHandler = (item: any, id: Products['id']) => {
        console.log(item)
        console.log(id)
        if(item.key !== id){
            setShowDet(!showDet)
            setShowList(!showList)
            setChosenId(id)
        } else if(item.key === id){
            setShowDet(showDet)
            setShowList(showList)
        }
    }

    const goBackToList = () => {
        setShowDet(!showDet)
        setShowList(!showList)
        // setProductsData(productsData)
    }


    
    return (
    <div>  
        {showList ? (
        <div>
        <input id="searchBar" type="text" placeholder="Search..." onChange={(e) => setSearchVal(e.target.value)}/> 

        <div className="product-list">
        
        {productsData.filter((val: any) => {
            if (searchVal === ''){
                return val
            } 
            else if(val.productName.toLowerCase().includes(searchVal.toLowerCase())){
                return val
            }
        }).map((val: any) => {
            return (
                <ul key={val.id} onClick={() => detailsHandler(productsData, val.id)} data-testid="toDetails">
                    <Card key={val.id} product={[val]} q={val.quantity} whenClick={(id) => setChosenId(id)} />
                </ul>
            )
        })}
        </div>

        </div>
        ) : null}

        {showDet ? 
        (
            <div>
                <div>
                    <button onClick={goBackToList}>back</button>
                </div>
                <Details details={chosenProduct as Products} id={chosenId} updateProduct={updateProduct} item={cartitem as CartItem} />
            </div>
        ) 
        : null}
        
    </div>
    )

}

export default ProductList