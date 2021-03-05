import { createI18n } from 'vue-i18n'

import LangEn from '@/common/lang/en-us'
import LangZh from '@/common/lang/zh-cn'

export default createI18n({
  locale: 'zh-cn',
  messages: {
    en: LangEn,
    'zh-cn': LangZh
  }
})
