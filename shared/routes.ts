import { z } from 'zod';
import { insertTeamMemberSchema, insertOperationalUpdateSchema, insertNurseryStatsSchema } from './schema';
import { siteCopySchema } from './siteCopy';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  teamMembers: {
    list: {
      method: 'GET' as const,
      path: '/api/team-members' as const,
      responses: {
        200: z.array(z.any()),
      },
    },
  },
  operationalUpdates: {
    list: {
      method: 'GET' as const,
      path: '/api/operational-updates' as const,
      responses: {
        200: z.array(z.any()),
      },
    },
  },
  nurseryStats: {
    latest: {
      method: 'GET' as const,
      path: '/api/nursery-stats/latest' as const,
      responses: {
        200: z.any(),
        404: errorSchemas.notFound,
      },
    },
  },
  galleryMedia: {
    list: {
      method: 'GET' as const,
      path: '/api/gallery-media' as const,
      responses: {
        200: z.array(z.any()),
      },
    },
  },
  siteCopy: {
    get: {
      method: 'GET' as const,
      path: '/api/site-copy' as const,
      responses: {
        200: siteCopySchema,
      },
    },
  },
  contactMessages: {
    create: {
      method: 'POST' as const,
      path: '/api/contact-messages' as const,
      body: z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        message: z.string().min(1),
      }),
      responses: {
        201: z.any(),
        400: errorSchemas.validation,
      },
    },
  },
  admin: {
    me: {
      method: 'GET' as const,
      path: '/api/admin/me' as const,
      responses: {
        200: z.object({ username: z.string() }),
        401: errorSchemas.notFound,
      },
    },
    login: {
      method: 'POST' as const,
      path: '/api/admin/login' as const,
      body: z.object({
        username: z.string().min(1),
        password: z.string().min(1),
      }),
      responses: {
        200: z.object({ username: z.string() }),
        401: errorSchemas.validation,
      },
    },
    logout: {
      method: 'POST' as const,
      path: '/api/admin/logout' as const,
      responses: {
        200: z.object({ success: z.boolean() }),
      },
    },
    teamMembers: {
      create: {
        method: 'POST' as const,
        path: '/api/admin/team-members' as const,
        body: insertTeamMemberSchema,
        responses: { 201: z.any(), 400: errorSchemas.validation, 401: errorSchemas.notFound },
      },
      update: {
        method: 'PATCH' as const,
        path: '/api/admin/team-members/:id' as const,
        body: insertTeamMemberSchema.partial(),
        responses: { 200: z.any(), 400: errorSchemas.validation, 401: errorSchemas.notFound, 404: errorSchemas.notFound },
      },
      delete: {
        method: 'DELETE' as const,
        path: '/api/admin/team-members/:id' as const,
        responses: { 200: z.object({ success: z.boolean() }), 401: errorSchemas.notFound, 404: errorSchemas.notFound },
      },
    },
    operationalUpdates: {
      create: {
        method: 'POST' as const,
        path: '/api/admin/operational-updates' as const,
        body: insertOperationalUpdateSchema,
        responses: { 201: z.any(), 400: errorSchemas.validation, 401: errorSchemas.notFound },
      },
      update: {
        method: 'PATCH' as const,
        path: '/api/admin/operational-updates/:id' as const,
        body: insertOperationalUpdateSchema.partial(),
        responses: { 200: z.any(), 400: errorSchemas.validation, 401: errorSchemas.notFound, 404: errorSchemas.notFound },
      },
      delete: {
        method: 'DELETE' as const,
        path: '/api/admin/operational-updates/:id' as const,
        responses: { 200: z.object({ success: z.boolean() }), 401: errorSchemas.notFound, 404: errorSchemas.notFound },
      },
    },
    nurseryStats: {
      create: {
        method: 'POST' as const,
        path: '/api/admin/nursery-stats' as const,
        body: insertNurseryStatsSchema,
        responses: { 201: z.any(), 400: errorSchemas.validation, 401: errorSchemas.notFound },
      },
    },
    galleryMedia: {
      create: {
        method: 'POST' as const,
        path: '/api/admin/gallery-media' as const,
        body: z.any(),
        responses: { 201: z.any(), 400: errorSchemas.validation, 401: errorSchemas.notFound },
      },
      update: {
        method: 'PATCH' as const,
        path: '/api/admin/gallery-media/:id' as const,
        body: z.any(),
        responses: { 200: z.any(), 400: errorSchemas.validation, 401: errorSchemas.notFound, 404: errorSchemas.notFound },
      },
      delete: {
        method: 'DELETE' as const,
        path: '/api/admin/gallery-media/:id' as const,
        responses: { 200: z.object({ success: z.boolean() }), 401: errorSchemas.notFound, 404: errorSchemas.notFound },
      },
    },
    contactMessages: {
      list: {
        method: 'GET' as const,
        path: '/api/admin/contact-messages' as const,
        responses: { 200: z.array(z.any()), 401: errorSchemas.notFound },
      },
      delete: {
        method: 'DELETE' as const,
        path: '/api/admin/contact-messages/:id' as const,
        responses: { 200: z.object({ success: z.boolean() }), 401: errorSchemas.notFound, 404: errorSchemas.notFound },
      },
      clear: {
        method: 'DELETE' as const,
        path: '/api/admin/contact-messages' as const,
        responses: { 200: z.object({ success: z.boolean(), deletedCount: z.number() }), 401: errorSchemas.notFound },
      },
    },
    uploads: {
      create: {
        method: 'POST' as const,
        path: '/api/admin/uploads' as const,
        body: z.object({
          fileName: z.string().min(1),
          dataUrl: z.string().min(1),
        }),
        responses: { 201: z.object({ url: z.string() }), 400: errorSchemas.validation, 401: errorSchemas.notFound },
      },
    },
    siteCopy: {
      get: {
        method: 'GET' as const,
        path: '/api/admin/site-copy' as const,
        responses: { 200: siteCopySchema, 401: errorSchemas.notFound },
      },
      update: {
        method: 'POST' as const,
        path: '/api/admin/site-copy' as const,
        body: siteCopySchema,
        responses: { 200: siteCopySchema, 400: errorSchemas.validation, 401: errorSchemas.notFound },
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type TeamMemberResponse = z.infer<typeof api.teamMembers.list.responses[200]>[number];
export type OperationalUpdateResponse = z.infer<typeof api.operationalUpdates.list.responses[200]>[number];
export type NurseryStatsResponse = z.infer<typeof api.nurseryStats.latest.responses[200]>;
export type GalleryMediaResponse = z.infer<typeof api.galleryMedia.list.responses[200]>[number];
export type SiteCopyResponse = z.infer<typeof api.siteCopy.get.responses[200]>;
