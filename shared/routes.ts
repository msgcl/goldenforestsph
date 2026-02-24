import { z } from 'zod';
import { insertTeamMemberSchema, insertOperationalUpdateSchema, insertNurseryStatsSchema } from './schema';

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
