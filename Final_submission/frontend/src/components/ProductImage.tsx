

export type ProductImageProps = {
    src: string;
  };

export function ProductImage({src}: ProductImageProps) {
    return <div className="image-container">
                    <img 
                    id="productImage" 
                    src={src}
                    className="img-fluid" 
                    style={{ maxWidth: "80%", height: "auto" }}
                    />
            </div>
}