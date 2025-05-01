
export type ProductProps = {
    productName: string;
    productSubheading: string;
    productDescription: string;

};

export function ProductTitle({productName, productSubheading, productDescription}: ProductProps) {
    return <>
                <h2 className="text-left">{productName}</h2>
                <h5 className="text-muted">{productSubheading}</h5>
                <p> {productDescription}</p>
            </>
}