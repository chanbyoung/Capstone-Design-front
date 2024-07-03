import styles from "./PageComponent.module.css";

const PageComponent = ({ serverData, movePage }) => {
  return (
    <div className={styles.PageComponent}>
      {serverData.prev ? (
        <div onClick={() => movePage({ page: serverData.prevPage })}>Prev </div>
      ) : (
        <></>
      )}

      {serverData.pageNumList.map((pageNum) => (
        <div
          className={styles.pageNum}
          key={pageNum}
          onClick={() => movePage({ page: pageNum })}
        >
          {pageNum}
        </div>
      ))}

      {serverData.next ? (
        <div onClick={() => movePage({ page: serverData.nextPage })}>Next</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PageComponent;
