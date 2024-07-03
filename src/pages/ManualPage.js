import styles from "./ManualPage.module.css";

function ManualPage() {
  return (
    <div className={styles.manualContainer}>
      <h1 className={styles.title}>두리끼리 사용법 매뉴얼</h1>

      <section className={styles.section}>
        <h2>소개 및 개요</h2>
        <p>
          두리끼리는 강원대학교 학생들이 스터디 그룹이나 프로젝트 팀을 간편하게
          찾고 구성할 수 있게 도와주는 온라인 플랫폼 서비스입니다. 이 서비스를
          통해 학생들은 학습 목표가 일치하는 다른 학생들을 쉽고 빠르게 찾아낼 수
          있습니다.
        </p>
      </section>

      <section className={styles.section}>
        <h2>회원가입 및 로그인</h2>
        <p>
          두리끼리를 이용하려면 회원가입이 필요합니다. 회원가입 시 이름, 닉네임,
          아이디, 이메일, 비밀번호, 전공을 입력해야 합니다. 이후 로그인을 통해
          서비스를 이용할 수 있습니다.
        </p>
      </section>

      <section className={styles.section}>
        <h2>팀원 모집 및 지원</h2>
        <p>
          프로젝트/스터디 팀원 모집 게시글을 작성할 수 있습니다. 모집 글에
          지원하려면 지원 버튼을 클릭 후 지원서를 제출할 수 있습니다.
        </p>
      </section>

      <section className={styles.section}>
        <h2>프로필 관리</h2>
        <p>
          프로필 페이지에서 자신의 정보를 관리할 수 있습니다. 필요한 경우 프로필
          정보를 수정할 수 있습니다.
        </p>
      </section>

      <section className={styles.section}>
        <h2>게시글 검색</h2>
        <p>
          게시글 검색 기능을 통해 관심 있는 분야의 게시글을 쉽게 찾아볼 수
          있습니다.
        </p>
      </section>

      <section className={styles.section}>
        <h2>자유게시판</h2>
        <p>자유게시판에서 다양한 이야기들을 자유롭게 나눌 수 있습니다.</p>
      </section>
    </div>
  );
}

export default ManualPage;
