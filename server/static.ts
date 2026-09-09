import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { renderSeoHtml } from "./seo";
import { resolveSeoPage } from "@shared/seo";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath, { index: false }));

  // fall through to index.html if the file doesn't exist
  app.use(async (req, res, next) => {
    try {
      const template = await fs.promises.readFile(path.resolve(distPath, "index.html"), "utf-8");
      const { found } = resolveSeoPage(req.path);
      res
        .status(found || req.path.startsWith("/admin") ? 200 : 404)
        .type("html")
        .send(renderSeoHtml(template, req.path));
    } catch (error) {
      next(error);
    }
  });
}
