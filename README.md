# 매장콕

요식업 사장님을 위한 AI 운영 도우미 웹앱입니다.  
매장 정보와 현재 고민을 입력하면 `OpenAI Responses API` 기반 AI가 진단 리포트를 생성하고, 결과를 `Supabase`에 저장합니다.

## 기술 스택

- Next.js 15+ App Router
- TypeScript
- Tailwind CSS
- shadcn/ui 스타일 컴포넌트
- Supabase
- Supabase Auth
- OpenAI Responses API
- Vercel 배포 기준

## 설치 명령어

```bash
npm install
npm install @radix-ui/react-slot @supabase/ssr @supabase/supabase-js class-variance-authority clsx lucide-react openai tailwind-merge zod
```

## 환경변수

`.env.example`을 기준으로 `.env.local`을 만듭니다.

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4.1-mini
```

## Supabase 설정

1. Supabase 프로젝트 생성
2. Authentication > Sign In / Providers 에서 `Email` 활성화
3. 아래 SQL을 SQL Editor에서 실행
4. 필요하면 Email Confirm 설정을 끄거나, 켜둘 경우 회원가입 후 이메일 인증

SQL 파일은 [supabase/schema.sql](/c:/Users/j/Desktop/매장비서/supabase/schema.sql)에 있습니다.

## 실행 명령어

```bash
npm run dev
```

## 폴더 구조

```text
src/
  app/
    actions/
      auth.ts
    dashboard/
      page.tsx
    diagnosis/
      new/
        actions.ts
        page.tsx
      [id]/
        page.tsx
    login/
      page.tsx
    error.tsx
    layout.tsx
    page.tsx
  components/
    auth/
    dashboard/
    diagnosis/
    layout/
    ui/
  lib/
    auth.ts
    diagnosis-schema.ts
    env.ts
    openai.ts
    queries.ts
    supabase/
      client.ts
      middleware.ts
      server.ts
```

## MVP 포함 기능

- `/` 랜딩 페이지
- `/login` 회원가입/로그인
- `/dashboard` 진단 목록
- `/diagnosis/new` 진단 입력폼
- `/diagnosis/[id]` 진단 상세 리포트
- OpenAI 기반 JSON 리포트 생성
- Supabase 저장 및 조회

## 참고 사항

- OpenAI API 키는 서버에서만 사용됩니다.
- AI 응답은 `zod` 스키마로 검증합니다.
- 보호 페이지는 로그인하지 않으면 `/login`으로 이동합니다.
- 현재 MVP는 매장별 별도 관리보다 “진단 기록 저장”에 우선순위를 둔 구조입니다.
