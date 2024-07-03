import mock from "./mock.json";
import boarddata from "./boarddata.json";

const { projects } = mock;
const { boards } = boarddata;

export function getProjects(keyword) {
  if (!keyword) return projects;
}

export function getProjectBySlug(projectSlug) {
  return projects.find((project) => project.slug === projectSlug);
}

export function getBoards(keyword) {
  if (!keyword) return boards;
}

export function getBoardBySlug(boardslug) {
  return boards.find((boards) => boards.slug === boardslug);
}
