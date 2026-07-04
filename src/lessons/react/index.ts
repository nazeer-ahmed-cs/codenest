import ComponentsMdx, { frontmatter as componentsFm } from "./components.mdx";
import StateHooksMdx, { frontmatter as stateHooksFm } from "./state-hooks.mdx";
import EventsMdx, { frontmatter as eventsFm } from "./events.mdx";
import ConditionalMdx, { frontmatter as conditionalFm } from "./conditional-rendering.mdx";
import EffectsMdx, { frontmatter as effectsFm } from "./effects.mdx";
import ContextMdx, { frontmatter as contextFm } from "./context.mdx";
import RefsMdx, { frontmatter as refsFm } from "./refs.mdx";
import CustomHooksMdx, { frontmatter as customHooksFm } from "./custom-hooks.mdx";
import type { LessonEntry } from "@/lib/curriculum";

export const lessons: LessonEntry[] = [
  { ...(componentsFm as unknown as LessonEntry), Content: ComponentsMdx },
  { ...(stateHooksFm as unknown as LessonEntry), Content: StateHooksMdx },
  { ...(eventsFm as unknown as LessonEntry), Content: EventsMdx },
  { ...(conditionalFm as unknown as LessonEntry), Content: ConditionalMdx },
  { ...(effectsFm as unknown as LessonEntry), Content: EffectsMdx },
  { ...(contextFm as unknown as LessonEntry), Content: ContextMdx },
  { ...(refsFm as unknown as LessonEntry), Content: RefsMdx },
  { ...(customHooksFm as unknown as LessonEntry), Content: CustomHooksMdx },
];
