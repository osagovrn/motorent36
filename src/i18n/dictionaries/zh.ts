import type { Dict } from "@/i18n/types";

export const zh: Dict = {
  meta: {
    defaultTitle: "{city}租赁 — 每天{price}₽起",
    defaultDescription:
      "{cityIn}租赁服务（尼科尔斯科耶）：摩托车头盔，更多品类即将上线。目前提供 JIEKAI JK902，每天{price}₽起。可通过电话、Telegram 或 MAX 预订，付款和押金在见面时支付。",
    ogAlt: "Beri36 — 沃罗涅日租赁",
    productTitle: (brand, model, sizePart, city, price) =>
      `${brand} ${model}${sizePart}头盔租赁（${city}）— 每天${price}₽起`,
    productDescription: (brand, model, city, price, sizesText) =>
      `${city}租用 ${brand} ${model} 头盔：每天${price}₽，押金可退，可通过电话、Telegram 或 MAX 预订。${sizesText}`.trim(),
    productNotFound: "未找到商品",
  },
  nav: {
    ariaMain: "主导航",
    ariaMobile: "移动端菜单",
    howItWorks: "使用方法",
    catalog: "商品目录",
    faq: "常见问题",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    call: "拨打电话",
    telegramWrite: "在 Telegram 上留言",
  },
  hero: {
    title: (city) => `在${city}租赁`,
    subtitle: "摩托车头盔——现已上线。工具等更多品类即将推出。价格",
    fromPrice: (price) => `每天${price}₽起。请在网站上查看日期，通过电话或即时通讯软件预订。`,
    call: "拨打电话",
    telegram: "Telegram",
    max: "MAX",
  },
  howItWorks: {
    title: "使用方法",
    subtitle: "三个步骤——无需在线支付，押金透明无意外。",
    step1Title: "电话或留言",
    step1Text:
      "从商品目录中选择物品，在网站上查看日期。拨打电话或在 Telegram / MAX 上留言——我们会确认预订。",
    step2Title: "见面",
    step2Text: (locality, landmark, street) =>
      `我们在${locality}区（${landmark}附近）${street}见面：您可以查看物品，如需要可试戴。签约需携带护照或驾驶证。`,
    step3Title: "付款与押金",
    step3Text: (market, deposit) =>
      `您需支付物品的完整市场价值（目前头盔为${market}₽）。物品状态良好归还后，押金将退还（例如，租一天押金为${deposit}₽）。`,
  },
  location: {
    label: "位置",
    title: "我们在哪里",
    description: (city, street) =>
      `马什梅特附近。地址：${city}，${street}。具体见面地点和时间将在预订时确认。`,
    openMaps: "在Yandex地图中打开 →",
    openNavi: "在Yandex导航中打开 →",
  },
  catalog: {
    title: "商品目录",
    subtitle: "目前有摩托车头盔；目录将持续扩充。",
    noPhoto: "暂无图片",
    from: "起",
    perDay: "₽/天",
    more: "详情 →",
  },
  whenNeeded: {
    title: "什么时候适合租赁",
    subtitle: "一天或更长时间——无需为一次性使用而购买。",
    items: [
      { title: "驾照考试", text: "考试当天用全盔——比购买更方便。" },
      { title: "乘客头盔", text: "为出行准备第二个头盔——租一天，两人都有保护。" },
      { title: "初次骑行", text: "在选购自己的头盔之前——租赁便于了解合适尺码。" },
      { title: "自己的头盔不可用", text: "忘带了、维修中或正在清洁——不必取消出行计划。" },
    ],
  },
  faq: {
    title: "常见问题",
    subtitle: "尺码、押金、见面——拨打电话前先简要了解。",
    moreLink: "查看所有问题 →",
    pageTitle: "常见问题",
    pageIntro: (city) => `关于${city}租赁的尺码、押金、见面和预订的解答。`,
    backHome: "← 返回首页",
    items: [
      {
        question: "如何选择头盔尺码？",
        answer:
          "用卷尺在眉毛和耳朵上方测量头围，并对照网站上的尺码表。如果处于两个尺码之间，通常建议选择较小的尺码，因为内衬会随时间略微松弛。见面时可在付款前试戴。",
      },
      {
        question: "在哪里见面？",
        answer:
          "我们在尼科尔斯科耶区（马什梅特附近），地址：沃罗涅日，阿尼·马克西莫娃街。具体地点和时间通过电话、Telegram 或 MAX 确定。首页有地图。",
      },
      {
        question: "取货时需要支付多少？押金如何运作？",
        answer:
          "取货时您需支付头盔的完整市场价值。所选天数的租金将从该金额中扣除，剩余部分作为可退押金。头盔状态良好归还时，押金将立即退还。",
      },
      {
        question: "需要什么证件吗？",
        answer:
          "是的。签订租赁合同时，见面时需要出示护照或驾驶证（现场拍照或复印均可）。出租方姓名和信息将在交接单中注明，不会在网站上公开。租用者须年满18岁。",
      },
      {
        question: "网站上有在线支付或预订表单吗？",
        answer:
          "没有在线支付，也没有预订表单。仅可通过拨打 +7 (950) 767-85-75、网站上的 Telegram 按钮或 MAX 8 (919) 183-14-07（Evgeniy）进行预订。租金和押金的支付在见面时以现金或协商转账方式完成。",
      },
      {
        question: "如果我延迟归还怎么办？",
        answer:
          "延迟归还将按所选头盔的资费自动增加一天的租金。请提前协商延期——这样对双方都更方便。",
      },
    ],
    sizeChartTitle: "尺码表",
    sizeChartNote: "用卷尺在眉毛和耳朵上方测量头围。",
  },
  finalCta: {
    title: "准备好租赁了吗？",
    subtitle: "在商品页面查看日期——最方便的方式是在 Telegram 留言或直接拨打电话。",
    call: "拨打电话",
    telegram: "Telegram",
    toBooking: "前往预订",
  },
  moreProjects: {
    eyebrow: "沃罗涅日的其他项目",
    title: "我们的其他项目",
    subtitle: "城市中的本地服务——同样的联系方式，不同的需求。",
    tag: "我们的项目",
  },
  footer: {
    offer: "条款",
    privacy: "隐私",
    noVat: "不含增值税",
  },
  mobileBar: {
    call: "拨打电话",
    telegram: "Telegram",
    dates: "日期",
  },
  product: {
    breadcrumbHome: "首页",
    breadcrumbCatalog: "商品目录",
    atPickup: (price) => `见面时支付 — ${price}₽`,
    atPickupNote:
      "其中包含所选天数的租金，其余部分作为押金保留。头盔状态良好归还后，押金将退还。",
    rentLine: (price) => `租金：${price}₽ / 天`,
    marketLine: (price) => `市场价值（保证金）：${price}₽`,
    depositNote: (price) => `见面时您始终需支付${price}₽ — 差额将作为押金退还`,
    bookingLine: "可通过电话、Telegram 或 MAX 预订",
    faqLink: "常见问题：尺码、押金、见面 →",
    bookTitle: "立即预订",
    noOnlineForm: "网站上没有预订表单。请通过电话预订",
    sizeLabel: "尺码",
    inStock: (list) => `现有库存：${list}`,
    quickTerm: "快速选择时长",
    day1: "1天",
    weekend: "周末",
    days3: "3天",
    startLabel: "租赁开始",
    endLabel: "归还日期",
    rentalCost: "租金费用",
    deposit: "可退押金",
    totalAtPickup: "取货时合计",
    minTermNote: (name) => `最短租期为1天。计算器仅供参考；预订由${name}通过电话或即时通讯软件确认。`,
    callBtn: (phone) => `拨打 ${phone}`,
    telegramBtn: "在 Telegram 留言",
    maxBtn: (phone) => `MAX ${phone}`,
    terms: "条款：",
    offer: "公开要约",
    privacy: "隐私政策",
  },
  legal: {
    noticeTitle: "此为便于阅读提供的翻译",
    noticeBody: (contactName, phone) =>
      `本文件具有法律效力的版本是下方的俄文原文。如果翻译内容有任何不清楚之处，请在租赁前通过${phone}联系${contactName}进行确认。`,
    offerPageTitle: "租赁公开要约",
    privacyPageTitle: "个人数据处理政策",
  },
  notFound: {
    title: "页面未找到",
    text: "该页面不存在——链接可能已失效。",
    backHome: "← 返回首页",
  },
};
