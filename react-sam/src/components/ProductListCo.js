import React from 'react';

function Loading() {
  return <div>Loading...</div>;
}

export function ProductListCo({ products, selectedIndex, onProductSelected }) {
  if (products === undefined) return <Loading />;

  if (products === null) {
    return <div>Error</div>;
  }

  return (
    <div className='list-products-co'>
      <h2 className='title-edit-product'>Productos publicados</h2>
      <ul className='product-list'>
        {products.map((product, index) => (
          <li
            key={product.id}
            onClick={() => onProductSelected(products[index])}
          >
            <div className={`product-item ${selectedIndex === index}`}>
              <div>
                <p>{product.name}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
