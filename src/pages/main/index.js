import React, { Component } from 'react';
import Api from '../../services/Api';
import { Link } from 'react-router-dom';

import './styles.css';

class Main extends Component {
    state = {
        products: [],
        productInfo : {},
        page: 1
    }

    componentDidMount() {//executa quando o componente carrega
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await Api.get(`/products?page=${page}`);
        const {docs, ...productInfo} = response.data;
        this.setState({ products: docs, productInfo, page});
    }

    prevPage = () => {
        const {page} = this.state;
        if(page === 1){
            return;
        }
        const pageNumber = page - 1;
        this.loadProducts(pageNumber);
    }

    nextPage = () => {
        const {page, productInfo} = this.state;
        if(page === productInfo.pages){
            return;
        }
        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
    }


    render() {
        const { products, page, productInfo } = this.state;

        return (
            <div className="product-list">
                {products.map(product => {
                    return (<article>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>
                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                    );
                })}
                <div className="actions">
                    <button onClick={this.prevPage} disabled={page === 1}>Anterior</button>
                    <button onClick={this.nextPage} disabled={page === productInfo.pages}>Próximo</button>
                </div>
            </div>
        );
    }
}

export default Main;