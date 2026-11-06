import type { Project } from "../types";
import { darAlRuya } from "./dar-al-ruya";
import { elkhalily } from "./elkhalily";
import { again } from "./again";
import { wsyelh } from "./wsyelh";
import { qudra } from "./qudra";
import { elDokan } from "./el-dokan";

/** Order matters: flagship projects first. */
export const projects: Project[] = [darAlRuya, elkhalily, again, wsyelh, qudra, elDokan];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectSlugs = projects.map((p) => p.slug);
