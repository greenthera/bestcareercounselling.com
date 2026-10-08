// Intrinsic image sizes and responsive WebP sources for local photography.
import image0 from '@/assets/career-counselling-group-discussion.webp'
import image0_640 from '@/assets/career-counselling-group-discussion-640.webp'
import image0_960 from '@/assets/career-counselling-group-discussion-960.webp'
import image1 from '@/assets/career-counselling-table-discussion.webp'
import image1_640 from '@/assets/career-counselling-table-discussion-640.webp'
import image1_960 from '@/assets/career-counselling-table-discussion-960.webp'
import image2 from '@/assets/career-counsellors-at-event.webp'
import image2_640 from '@/assets/career-counsellors-at-event-640.webp'
import image2_960 from '@/assets/career-counsellors-at-event-960.webp'
import image3 from '@/assets/career-counselling-event-conversation.webp'
import image3_640 from '@/assets/career-counselling-event-conversation-640.webp'
import image3_960 from '@/assets/career-counselling-event-conversation-960.webp'
import image4 from '@/assets/career-counselling-small-group.webp'
import image4_640 from '@/assets/career-counselling-small-group-640.webp'
import image4_960 from '@/assets/career-counselling-small-group-960.webp'
import image5 from '@/assets/career-counselling-workshop-discussion.webp'
import image5_640 from '@/assets/career-counselling-workshop-discussion-640.webp'
import image5_960 from '@/assets/career-counselling-workshop-discussion-960.webp'
import image6 from '@/assets/career-counsellors-at-seminar.webp'
import image6_640 from '@/assets/career-counsellors-at-seminar-640.webp'
import image6_960 from '@/assets/career-counsellors-at-seminar-960.webp'
import image7 from '@/assets/career-guidance-networking-event.webp'
import image7_640 from '@/assets/career-guidance-networking-event-640.webp'
import image7_960 from '@/assets/career-guidance-networking-event-960.webp'
import image8 from '@/assets/kishan-patel.webp'
import image9 from '@/assets/meeta-patel.webp'
import image10 from '@/assets/hero-portrait.webp'
import image10_640 from '@/assets/hero-portrait-640.webp'
import image10_960 from '@/assets/hero-portrait-960.webp'
import portraitSmall from '@/assets/hero-portrait-720.webp'
import image11 from '@/assets/hero-landscape.webp'
import image11_640 from '@/assets/hero-landscape-640.webp'
import image11_960 from '@/assets/hero-landscape-960.webp'
import landscapeSmall from '@/assets/hero-landscape-680.webp'

export const imageMetadata: Record<string, { width: number; height: number; srcSet: string }> = {
  [image0]: { width: 1400, height: 1050, srcSet: `${image0_640} 640w, ${image0_960} 960w, ${image0} 1400w` },
  [image1]: { width: 1400, height: 1050, srcSet: `${image1_640} 640w, ${image1_960} 960w, ${image1} 1400w` },
  [image2]: { width: 1400, height: 788, srcSet: `${image2_640} 640w, ${image2_960} 960w, ${image2} 1400w` },
  [image3]: { width: 1400, height: 1050, srcSet: `${image3_640} 640w, ${image3_960} 960w, ${image3} 1400w` },
  [image4]: { width: 1200, height: 900, srcSet: `${image4_640} 640w, ${image4_960} 960w, ${image4} 1200w` },
  [image5]: { width: 1200, height: 900, srcSet: `${image5_640} 640w, ${image5_960} 960w, ${image5} 1200w` },
  [image6]: { width: 1200, height: 675, srcSet: `${image6_640} 640w, ${image6_960} 960w, ${image6} 1200w` },
  [image7]: { width: 1200, height: 900, srcSet: `${image7_640} 640w, ${image7_960} 960w, ${image7} 1200w` },
  [image8]: { width: 392, height: 450, srcSet: `${image8} 392w` },
  [image9]: { width: 392, height: 450, srcSet: `${image9} 392w` },
  [image10]: { width: 1000, height: 1778, srcSet: `${image10_640} 640w, ${image10_960} 960w, ${portraitSmall} 720w, ${image10} 1000w` },
  [image11]: { width: 1200, height: 900, srcSet: `${image11_640} 640w, ${image11_960} 960w, ${landscapeSmall} 680w, ${image11} 1200w` },
}
