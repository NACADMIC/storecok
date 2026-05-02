import type { DiagnosisDetail } from "@/lib/types";

export const demoDiagnosisDetail: DiagnosisDetail = {
  id: "demo-report",
  createdAt: "2025-01-15T10:00:00.000Z",
  inputData: {
    storeName: "성수분식",
    category: "분식",
    location: "서울 성동구 성수동",
    mainMenu: "떡볶이, 튀김, 김밥",
    averageOrderPrice: "11,000원",
    diagnosisType: "종합 진단",
    operationMode: "홀+배달 함께",
    reportStyle: "매출 우선",
    priorityAreas: ["리뷰 관리", "홍보 문구", "저녁 매출"],
    usesDeliveryApps: "예",
    deliveryApps: "배민, 쿠팡이츠",
    reviewIssues: "맛은 괜찮다는 반응이 많은데 답글이 늦고, 포장 상태 관련 불만이 반복됩니다.",
    salesConcerns: "점심은 꾸준하지만 저녁 매출이 약하고, 배달 주문이 주말에만 몰립니다.",
    marketingConcerns: "인스타 업로드는 하고 있지만 신규 방문 전환이 약하고 이벤트 홍보가 약합니다.",
    ownerGoal: "평일 저녁 매출 20% 올리고 재방문 고객 비중 높이기",
    extraNotes: "최근 메뉴판을 바꿨고, 홀 직원이 저녁에 부족합니다.",
  },
  report: {
    overallSummary:
      "성수분식은 기본 메뉴 경쟁력은 있지만 리뷰 응답과 저녁 시간대 전환 설계가 약합니다. 지금은 신규 손님 첫인상과 저녁 대표 세트 구성을 먼저 손보는 게 맞습니다.",
    storeScore: {
      score: 78,
      reason:
        "기본 메뉴 반응과 주문 기반은 있으나, 리뷰 관리와 저녁 매출 전환 설계가 약해서 점수가 깎였습니다.",
    },
    topProblems: [
      {
        title: "리뷰 답글 속도와 톤이 들쭉날쭉합니다",
        reason: "긍정 리뷰에도 반응이 늦고, 불만 리뷰에 대한 사과와 후속 안내가 일정하지 않습니다.",
        impact: "신규 손님이 매장 신뢰도를 낮게 볼 수 있고 재방문 기대도 줄어듭니다.",
      },
      {
        title: "저녁 대표 세트가 약합니다",
        reason: "배고픈 시간대에 바로 고를 수 있는 대표 세트가 약해 선택이 분산됩니다.",
        impact: "저녁 객단가가 낮게 형성되고 추가 주문 유도가 약해집니다.",
      },
      {
        title: "홍보 문구가 방문 이유를 못 만듭니다",
        reason: "인스타와 배달앱 소개 문구가 메뉴 특징보다 정보성 문장 위주입니다.",
        impact: "처음 보는 손님이 저장하거나 바로 주문할 이유가 약합니다.",
      },
    ],
    prioritizedActions: [
      {
        priority: "높음",
        title: "리뷰 답글 템플릿 3종 고정",
        action:
          "칭찬 리뷰, 보통 리뷰, 불만 리뷰로 나눠 답글 틀을 만들고 하루 2번 정해진 시간에 몰아서 응답합니다.",
        expectedEffect: "평점 방어와 신규 손님 신뢰도 개선",
      },
      {
        priority: "높음",
        title: "저녁 세트 메뉴 2개 재구성",
        action:
          "떡볶이+튀김 세트, 떡볶이+김밥 세트를 대표 노출하고 세트명도 저녁용으로 명확히 바꿉니다.",
        expectedEffect: "저녁 객단가 상승과 주문 선택 속도 개선",
      },
      {
        priority: "중간",
        title: "배달앱 첫 문장 교체",
        action:
          "메뉴 설명보다 한 끼 해결 포인트를 먼저 보여주는 문장으로 상단 소개를 교체합니다.",
        expectedEffect: "신규 주문 전환율 개선",
      },
      {
        priority: "중간",
        title: "인스타 한정 이벤트 문구 정리",
        action:
          "주 2회만 올려도 되는 수준으로 사진 1장, 문구 1줄, 혜택 1줄 구조로 고정합니다.",
        expectedEffect: "가벼운 저장과 방문 유입 증가",
      },
    ],
    reviewReplyExamples: [
      {
        situation: "포장 상태가 아쉽다는 리뷰",
        reply:
          "불편을 드려 죄송합니다. 포장 상태는 바로 점검해서 같은 문제가 반복되지 않게 정리하겠습니다. 다음 방문 때 더 나은 모습으로 보답하겠습니다.",
      },
      {
        situation: "맛있지만 답글이 늦었다는 반응",
        reply:
          "좋은 말씀 남겨주셔서 감사합니다. 답글이 늦어 아쉬움을 드렸네요. 앞으로는 더 빠르게 확인하고 인사드리겠습니다.",
      },
    ],
    menuImprovementIdeas: [
      {
        idea: "저녁 든든 세트",
        detail: "떡볶이+모둠튀김 조합으로 이름을 단순하게 만들고 사진 한 장으로 바로 이해되게 구성합니다.",
      },
      {
        idea: "혼밥 세트 분리",
        detail: "1인 떡볶이+미니김밥 조합을 따로 빼서 배달앱과 홀 메뉴판 둘 다 노출합니다.",
      },
      {
        idea: "추가 메뉴 위치 조정",
        detail: "주문 직전에 많이 붙는 계란, 튀김, 음료를 세트 바로 아래에 묶어 보여줍니다.",
      },
    ],
    snsPromotionCopy: [
      "오늘 저녁 뭐 먹지 고민될 때, 매콤한 떡볶이랑 바삭한 튀김 한 세트로 딱 정리해보세요.",
      "성수분식 저녁 인기 조합 다시 정리했습니다. 저장해두고 퇴근길에 바로 들르세요.",
    ],
    flyerPromotionCopy: [
      "퇴근길 한 끼, 떡볶이+튀김 대표 세트로 간단하고 든든하게.",
      "혼자 먹기 좋은 분식 세트부터 여럿이 먹는 세트까지, 성수분식에서 바로 해결하세요.",
    ],
    sevenDayPlan: [
      { day: "Day 1", task: "최근 20개 리뷰를 칭찬/보통/불만으로 나눠 답글 템플릿 3종 만들기" },
      { day: "Day 2", task: "저녁 대표 세트 2개 정하고 메뉴판과 배달앱 순서 수정하기" },
      { day: "Day 3", task: "배달앱 상단 소개 문구를 방문 이유 중심 문장으로 교체하기" },
      { day: "Day 4", task: "인스타용 메뉴 사진 3장만 다시 고르고 문구 템플릿 정리하기" },
      { day: "Day 5", task: "포장 상태 불만이 나온 지점을 점검하고 체크리스트 만들기" },
      { day: "Day 6", task: "저녁 시간 방문 손님에게 대표 세트 추천 멘트 통일하기" },
      { day: "Day 7", task: "일주일간 리뷰/주문 반응 확인하고 다음 주 수정 포인트 정리하기" },
    ],
    cautions: [
      "할인만으로 저녁 매출을 올리려 하지 말고 대표 세트 구성을 먼저 손보는 게 낫습니다.",
      "불만 리뷰는 감정적으로 길게 대응하지 말고 사과, 조치, 재방문 유도 순서로 짧게 정리하는 게 좋습니다.",
      "SNS는 자주 올리는 것보다 저장하고 주문할 이유가 보이는 문장을 먼저 잡아야 합니다.",
    ],
  },
  store: {
    id: "demo-store",
    storeName: "성수분식",
    category: "분식",
    location: "서울 성동구 성수동",
    mainMenu: "떡볶이, 튀김, 김밥",
    averageOrderPrice: "11,000원",
    deliveryApps: "배민, 쿠팡이츠",
  },
};
