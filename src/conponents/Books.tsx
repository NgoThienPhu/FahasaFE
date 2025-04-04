import React, { useEffect, useRef } from 'react';
import styles from './books.module.css';

interface ProductsProps {
    children: React.ReactNode;
    gridTemplateColumns?: string;
    gapRow?: string;
    gapColumn?: string;
    padding?: string;
    margin?: string;
}

const Books: React.FC<ProductsProps> = (props) => {

    const productContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (productContainerRef.current) {
            const style = productContainerRef.current.style;
            if (props.padding) style.padding = props.padding;
            if (props.margin) style.margin = props.margin;
            if (props.gapColumn) style.columnGap = props.gapColumn;
            if (props.gapRow) style.rowGap = props.gapRow;
            if (props.gridTemplateColumns) style.gridTemplateColumns = props.gridTemplateColumns;
        }
    }, [props.padding, props.gapColumn, props.gapRow, props.gridTemplateColumns, props.margin])

    return (
        <div ref={productContainerRef} className={styles.productContainer}>
            {props.children}
        </div>
    );
};

export default Books;