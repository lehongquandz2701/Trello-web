import { Virtuoso } from "react-virtuoso";

type TListProps = {
  content: React.ReactNode;
  data?: any;
};

const List = ({ content, data }: TListProps) => {
  function Footer() {
    return (
      <div
        style={{
          padding: "10px",
          display: "inline-block",
          whiteSpace: "nowrap",
          verticalAlign: "top",
          background: "Red",
        }}
      >
        end reached{" "}
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          .custom-virtuoso::-webkit-scrollbar {
           width: 14px; 
          height: 14px;
          }
          .custom-virtuoso::-webkit-scrollbar-thumb {
            background: #313A39;
            border-radius: 10px;
              cursor: pointer;
              border: 2px solid transparent; 
               background-clip: padding-box;
          }
      
          .custom-virtuoso {
            height: calc(100vh - 130px);
            width: 100%;
            overflow: auto;
        
          }
        `}
      </style>
      <Virtuoso
        components={{
          Header: Footer,
        }}
        className="custom-virtuoso"
        horizontalDirection
        computeItemKey={(index, item) => index}
        data={[1, 2, 3, 4]}
        itemContent={() => (
          <div
            style={{
              padding: "10px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            {content}
          </div>
        )}
      />
    </>
  );
};

export default List;
