import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const TaskScalarFieldEnumSchema = z.enum(['id','title','description','status','priority','dueDate','reminder','startTime','endTime','isRecurring','frequency','interval','endDate','daysOfWeek','dayOfMonth','createdAt','updatedAt','completedAt','assigneeId','categoryId']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email']);

export const CategoryScalarFieldEnumSchema = z.enum(['id','name','description','userId']);

export const LabelScalarFieldEnumSchema = z.enum(['id','name','color','userId']);

export const TaskLabelScalarFieldEnumSchema = z.enum(['taskId','labelId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const TaskStatusSchema = z.enum(['pending','in_progress','completed','archived']);

export type TaskStatusType = `${z.infer<typeof TaskStatusSchema>}`

export const RecurrenceFrequencySchema = z.enum(['daily','weekly','monthly','yearly','custom']);

export type RecurrenceFrequencyType = `${z.infer<typeof RecurrenceFrequencySchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// TASK SCHEMA
/////////////////////////////////////////

export const TaskSchema = z.object({
  status: TaskStatusSchema,
  frequency: RecurrenceFrequencySchema.nullable(),
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  priority: z.number().int(),
  dueDate: z.coerce.date().nullable(),
  reminder: z.coerce.date().nullable(),
  startTime: z.coerce.date().nullable(),
  endTime: z.coerce.date().nullable(),
  isRecurring: z.boolean(),
  interval: z.number().int().nullable(),
  endDate: z.coerce.date().nullable(),
  daysOfWeek: JsonValueSchema.nullable(),
  dayOfMonth: z.number().int().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  completedAt: z.coerce.date().nullable(),
  assigneeId: z.string().nullable(),
  categoryId: z.string().nullable(),
})

export type Task = z.infer<typeof TaskSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  userId: z.string(),
})

export type Category = z.infer<typeof CategorySchema>

/////////////////////////////////////////
// LABEL SCHEMA
/////////////////////////////////////////

export const LabelSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  color: z.string().nullable(),
  userId: z.string(),
})

export type Label = z.infer<typeof LabelSchema>

/////////////////////////////////////////
// TASK LABEL SCHEMA
/////////////////////////////////////////

export const TaskLabelSchema = z.object({
  taskId: z.string(),
  labelId: z.string(),
})

export type TaskLabel = z.infer<typeof TaskLabelSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// TASK
//------------------------------------------------------

export const TaskIncludeSchema: z.ZodType<Prisma.TaskInclude> = z.object({
  assignee: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
  labels: z.union([z.boolean(),z.lazy(() => TaskLabelFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TaskCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TaskArgsSchema: z.ZodType<Prisma.TaskDefaultArgs> = z.object({
  select: z.lazy(() => TaskSelectSchema).optional(),
  include: z.lazy(() => TaskIncludeSchema).optional(),
}).strict();

export const TaskCountOutputTypeArgsSchema: z.ZodType<Prisma.TaskCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TaskCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TaskCountOutputTypeSelectSchema: z.ZodType<Prisma.TaskCountOutputTypeSelect> = z.object({
  labels: z.boolean().optional(),
}).strict();

export const TaskSelectSchema: z.ZodType<Prisma.TaskSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  status: z.boolean().optional(),
  priority: z.boolean().optional(),
  dueDate: z.boolean().optional(),
  reminder: z.boolean().optional(),
  startTime: z.boolean().optional(),
  endTime: z.boolean().optional(),
  isRecurring: z.boolean().optional(),
  frequency: z.boolean().optional(),
  interval: z.boolean().optional(),
  endDate: z.boolean().optional(),
  daysOfWeek: z.boolean().optional(),
  dayOfMonth: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  completedAt: z.boolean().optional(),
  assigneeId: z.boolean().optional(),
  categoryId: z.boolean().optional(),
  assignee: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
  labels: z.union([z.boolean(),z.lazy(() => TaskLabelFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TaskCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  Category: z.union([z.boolean(),z.lazy(() => CategoryFindManyArgsSchema)]).optional(),
  Label: z.union([z.boolean(),z.lazy(() => LabelFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  tasks: z.boolean().optional(),
  Category: z.boolean().optional(),
  Label: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  Category: z.union([z.boolean(),z.lazy(() => CategoryFindManyArgsSchema)]).optional(),
  Label: z.union([z.boolean(),z.lazy(() => LabelFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CATEGORY
//------------------------------------------------------

export const CategoryIncludeSchema: z.ZodType<Prisma.CategoryInclude> = z.object({
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CategoryArgsSchema: z.ZodType<Prisma.CategoryDefaultArgs> = z.object({
  select: z.lazy(() => CategorySelectSchema).optional(),
  include: z.lazy(() => CategoryIncludeSchema).optional(),
}).strict();

export const CategoryCountOutputTypeArgsSchema: z.ZodType<Prisma.CategoryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CategoryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CategoryCountOutputTypeSelectSchema: z.ZodType<Prisma.CategoryCountOutputTypeSelect> = z.object({
  tasks: z.boolean().optional(),
}).strict();

export const CategorySelectSchema: z.ZodType<Prisma.CategorySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  userId: z.boolean().optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LABEL
//------------------------------------------------------

export const LabelIncludeSchema: z.ZodType<Prisma.LabelInclude> = z.object({
  tasks: z.union([z.boolean(),z.lazy(() => TaskLabelFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LabelCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const LabelArgsSchema: z.ZodType<Prisma.LabelDefaultArgs> = z.object({
  select: z.lazy(() => LabelSelectSchema).optional(),
  include: z.lazy(() => LabelIncludeSchema).optional(),
}).strict();

export const LabelCountOutputTypeArgsSchema: z.ZodType<Prisma.LabelCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => LabelCountOutputTypeSelectSchema).nullish(),
}).strict();

export const LabelCountOutputTypeSelectSchema: z.ZodType<Prisma.LabelCountOutputTypeSelect> = z.object({
  tasks: z.boolean().optional(),
}).strict();

export const LabelSelectSchema: z.ZodType<Prisma.LabelSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  color: z.boolean().optional(),
  userId: z.boolean().optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskLabelFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LabelCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TASK LABEL
//------------------------------------------------------

export const TaskLabelIncludeSchema: z.ZodType<Prisma.TaskLabelInclude> = z.object({
  task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
  label: z.union([z.boolean(),z.lazy(() => LabelArgsSchema)]).optional(),
}).strict()

export const TaskLabelArgsSchema: z.ZodType<Prisma.TaskLabelDefaultArgs> = z.object({
  select: z.lazy(() => TaskLabelSelectSchema).optional(),
  include: z.lazy(() => TaskLabelIncludeSchema).optional(),
}).strict();

export const TaskLabelSelectSchema: z.ZodType<Prisma.TaskLabelSelect> = z.object({
  taskId: z.boolean().optional(),
  labelId: z.boolean().optional(),
  task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
  label: z.union([z.boolean(),z.lazy(() => LabelArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const TaskWhereInputSchema: z.ZodType<Prisma.TaskWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumTaskStatusFilterSchema),z.lazy(() => TaskStatusSchema) ]).optional(),
  priority: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  dueDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  reminder: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  startTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  endTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  isRecurring: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  frequency: z.union([ z.lazy(() => EnumRecurrenceFrequencyNullableFilterSchema),z.lazy(() => RecurrenceFrequencySchema) ]).optional().nullable(),
  interval: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  endDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  daysOfWeek: z.lazy(() => JsonNullableFilterSchema).optional(),
  dayOfMonth: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  completedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  assigneeId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  categoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  assignee: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  category: z.union([ z.lazy(() => CategoryNullableScalarRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional().nullable(),
  labels: z.lazy(() => TaskLabelListRelationFilterSchema).optional()
}).strict();

export const TaskOrderByWithRelationInputSchema: z.ZodType<Prisma.TaskOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  reminder: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  startTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isRecurring: z.lazy(() => SortOrderSchema).optional(),
  frequency: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  interval: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dayOfMonth: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  completedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  assigneeId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  categoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  assignee: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  category: z.lazy(() => CategoryOrderByWithRelationInputSchema).optional(),
  labels: z.lazy(() => TaskLabelOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TaskWhereUniqueInputSchema: z.ZodType<Prisma.TaskWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumTaskStatusFilterSchema),z.lazy(() => TaskStatusSchema) ]).optional(),
  priority: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  dueDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  reminder: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  startTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  endTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  isRecurring: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  frequency: z.union([ z.lazy(() => EnumRecurrenceFrequencyNullableFilterSchema),z.lazy(() => RecurrenceFrequencySchema) ]).optional().nullable(),
  interval: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  endDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  daysOfWeek: z.lazy(() => JsonNullableFilterSchema).optional(),
  dayOfMonth: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  completedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  assigneeId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  categoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  assignee: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  category: z.union([ z.lazy(() => CategoryNullableScalarRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional().nullable(),
  labels: z.lazy(() => TaskLabelListRelationFilterSchema).optional()
}).strict());

export const TaskOrderByWithAggregationInputSchema: z.ZodType<Prisma.TaskOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  reminder: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  startTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isRecurring: z.lazy(() => SortOrderSchema).optional(),
  frequency: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  interval: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  daysOfWeek: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dayOfMonth: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  completedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  assigneeId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  categoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => TaskCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TaskAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TaskMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TaskMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TaskSumOrderByAggregateInputSchema).optional()
}).strict();

export const TaskScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TaskScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TaskScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumTaskStatusWithAggregatesFilterSchema),z.lazy(() => TaskStatusSchema) ]).optional(),
  priority: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  dueDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  reminder: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  startTime: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  endTime: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  isRecurring: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  frequency: z.union([ z.lazy(() => EnumRecurrenceFrequencyNullableWithAggregatesFilterSchema),z.lazy(() => RecurrenceFrequencySchema) ]).optional().nullable(),
  interval: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  endDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  daysOfWeek: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  dayOfMonth: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  completedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  assigneeId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  categoryId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional(),
  Category: z.lazy(() => CategoryListRelationFilterSchema).optional(),
  Label: z.lazy(() => LabelListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tasks: z.lazy(() => TaskOrderByRelationAggregateInputSchema).optional(),
  Category: z.lazy(() => CategoryOrderByRelationAggregateInputSchema).optional(),
  Label: z.lazy(() => LabelOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional(),
  Category: z.lazy(() => CategoryListRelationFilterSchema).optional(),
  Label: z.lazy(() => LabelListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const CategoryWhereInputSchema: z.ZodType<Prisma.CategoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const CategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.CategoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tasks: z.lazy(() => TaskOrderByRelationAggregateInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const CategoryWhereUniqueInputSchema: z.ZodType<Prisma.CategoryWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    name_userId: z.lazy(() => CategoryNameUserIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    name_userId: z.lazy(() => CategoryNameUserIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  name_userId: z.lazy(() => CategoryNameUserIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const CategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.CategoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CategoryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CategoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CategoryMinOrderByAggregateInputSchema).optional()
}).strict();

export const CategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CategoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const LabelWhereInputSchema: z.ZodType<Prisma.LabelWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LabelWhereInputSchema),z.lazy(() => LabelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LabelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LabelWhereInputSchema),z.lazy(() => LabelWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  color: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tasks: z.lazy(() => TaskLabelListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const LabelOrderByWithRelationInputSchema: z.ZodType<Prisma.LabelOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tasks: z.lazy(() => TaskLabelOrderByRelationAggregateInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const LabelWhereUniqueInputSchema: z.ZodType<Prisma.LabelWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    name_userId: z.lazy(() => LabelNameUserIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    name_userId: z.lazy(() => LabelNameUserIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  name_userId: z.lazy(() => LabelNameUserIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => LabelWhereInputSchema),z.lazy(() => LabelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LabelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LabelWhereInputSchema),z.lazy(() => LabelWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  color: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tasks: z.lazy(() => TaskLabelListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const LabelOrderByWithAggregationInputSchema: z.ZodType<Prisma.LabelOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LabelCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LabelMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LabelMinOrderByAggregateInputSchema).optional()
}).strict();

export const LabelScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LabelScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LabelScalarWhereWithAggregatesInputSchema),z.lazy(() => LabelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LabelScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LabelScalarWhereWithAggregatesInputSchema),z.lazy(() => LabelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  color: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const TaskLabelWhereInputSchema: z.ZodType<Prisma.TaskLabelWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskLabelWhereInputSchema),z.lazy(() => TaskLabelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskLabelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskLabelWhereInputSchema),z.lazy(() => TaskLabelWhereInputSchema).array() ]).optional(),
  taskId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  labelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  task: z.union([ z.lazy(() => TaskScalarRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional(),
  label: z.union([ z.lazy(() => LabelScalarRelationFilterSchema),z.lazy(() => LabelWhereInputSchema) ]).optional(),
}).strict();

export const TaskLabelOrderByWithRelationInputSchema: z.ZodType<Prisma.TaskLabelOrderByWithRelationInput> = z.object({
  taskId: z.lazy(() => SortOrderSchema).optional(),
  labelId: z.lazy(() => SortOrderSchema).optional(),
  task: z.lazy(() => TaskOrderByWithRelationInputSchema).optional(),
  label: z.lazy(() => LabelOrderByWithRelationInputSchema).optional()
}).strict();

export const TaskLabelWhereUniqueInputSchema: z.ZodType<Prisma.TaskLabelWhereUniqueInput> = z.object({
  taskId_labelId: z.lazy(() => TaskLabelTaskIdLabelIdCompoundUniqueInputSchema)
})
.and(z.object({
  taskId_labelId: z.lazy(() => TaskLabelTaskIdLabelIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => TaskLabelWhereInputSchema),z.lazy(() => TaskLabelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskLabelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskLabelWhereInputSchema),z.lazy(() => TaskLabelWhereInputSchema).array() ]).optional(),
  taskId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  labelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  task: z.union([ z.lazy(() => TaskScalarRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional(),
  label: z.union([ z.lazy(() => LabelScalarRelationFilterSchema),z.lazy(() => LabelWhereInputSchema) ]).optional(),
}).strict());

export const TaskLabelOrderByWithAggregationInputSchema: z.ZodType<Prisma.TaskLabelOrderByWithAggregationInput> = z.object({
  taskId: z.lazy(() => SortOrderSchema).optional(),
  labelId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TaskLabelCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TaskLabelMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TaskLabelMinOrderByAggregateInputSchema).optional()
}).strict();

export const TaskLabelScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TaskLabelScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TaskLabelScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskLabelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskLabelScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskLabelScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskLabelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  taskId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  labelId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const TaskCreateInputSchema: z.ZodType<Prisma.TaskCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  status: z.lazy(() => TaskStatusSchema),
  priority: z.number().int(),
  dueDate: z.coerce.date().optional().nullable(),
  reminder: z.coerce.date().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  isRecurring: z.boolean().optional(),
  frequency: z.lazy(() => RecurrenceFrequencySchema).optional().nullable(),
  interval: z.number().int().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  completedAt: z.coerce.date().optional().nullable(),
  assignee: z.lazy(() => UserCreateNestedOneWithoutTasksInputSchema).optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutTasksInputSchema).optional(),
  labels: z.lazy(() => TaskLabelCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUncheckedCreateInputSchema: z.ZodType<Prisma.TaskUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  status: z.lazy(() => TaskStatusSchema),
  priority: z.number().int(),
  dueDate: z.coerce.date().optional().nullable(),
  reminder: z.coerce.date().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  isRecurring: z.boolean().optional(),
  frequency: z.lazy(() => RecurrenceFrequencySchema).optional().nullable(),
  interval: z.number().int().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  completedAt: z.coerce.date().optional().nullable(),
  assigneeId: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  labels: z.lazy(() => TaskLabelUncheckedCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUpdateInputSchema: z.ZodType<Prisma.TaskUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reminder: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRecurring: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  frequency: z.union([ z.lazy(() => RecurrenceFrequencySchema),z.lazy(() => NullableEnumRecurrenceFrequencyFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interval: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assignee: z.lazy(() => UserUpdateOneWithoutTasksNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneWithoutTasksNestedInputSchema).optional(),
  labels: z.lazy(() => TaskLabelUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reminder: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRecurring: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  frequency: z.union([ z.lazy(() => RecurrenceFrequencySchema),z.lazy(() => NullableEnumRecurrenceFrequencyFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interval: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assigneeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  labels: z.lazy(() => TaskLabelUncheckedUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskCreateManyInputSchema: z.ZodType<Prisma.TaskCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  status: z.lazy(() => TaskStatusSchema),
  priority: z.number().int(),
  dueDate: z.coerce.date().optional().nullable(),
  reminder: z.coerce.date().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  isRecurring: z.boolean().optional(),
  frequency: z.lazy(() => RecurrenceFrequencySchema).optional().nullable(),
  interval: z.number().int().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  completedAt: z.coerce.date().optional().nullable(),
  assigneeId: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable()
}).strict();

export const TaskUpdateManyMutationInputSchema: z.ZodType<Prisma.TaskUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reminder: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRecurring: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  frequency: z.union([ z.lazy(() => RecurrenceFrequencySchema),z.lazy(() => NullableEnumRecurrenceFrequencyFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interval: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TaskUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reminder: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRecurring: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  frequency: z.union([ z.lazy(() => RecurrenceFrequencySchema),z.lazy(() => NullableEnumRecurrenceFrequencyFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interval: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assigneeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  email: z.string(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutAssigneeInputSchema).optional(),
  Category: z.lazy(() => CategoryCreateNestedManyWithoutUserInputSchema).optional(),
  Label: z.lazy(() => LabelCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  email: z.string(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutAssigneeInputSchema).optional(),
  Category: z.lazy(() => CategoryUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Label: z.lazy(() => LabelUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  Category: z.lazy(() => CategoryUpdateManyWithoutUserNestedInputSchema).optional(),
  Label: z.lazy(() => LabelUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  Category: z.lazy(() => CategoryUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Label: z.lazy(() => LabelUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  email: z.string()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryCreateInputSchema: z.ZodType<Prisma.CategoryCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutCategoryInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCategoryInputSchema)
}).strict();

export const CategoryUncheckedCreateInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  userId: z.string(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUpdateInputSchema: z.ZodType<Prisma.CategoryUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tasks: z.lazy(() => TaskUpdateManyWithoutCategoryNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryCreateManyInputSchema: z.ZodType<Prisma.CategoryCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  userId: z.string()
}).strict();

export const CategoryUpdateManyMutationInputSchema: z.ZodType<Prisma.CategoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CategoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LabelCreateInputSchema: z.ZodType<Prisma.LabelCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  tasks: z.lazy(() => TaskLabelCreateNestedManyWithoutLabelInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutLabelInputSchema)
}).strict();

export const LabelUncheckedCreateInputSchema: z.ZodType<Prisma.LabelUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  userId: z.string(),
  tasks: z.lazy(() => TaskLabelUncheckedCreateNestedManyWithoutLabelInputSchema).optional()
}).strict();

export const LabelUpdateInputSchema: z.ZodType<Prisma.LabelUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tasks: z.lazy(() => TaskLabelUpdateManyWithoutLabelNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLabelNestedInputSchema).optional()
}).strict();

export const LabelUncheckedUpdateInputSchema: z.ZodType<Prisma.LabelUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TaskLabelUncheckedUpdateManyWithoutLabelNestedInputSchema).optional()
}).strict();

export const LabelCreateManyInputSchema: z.ZodType<Prisma.LabelCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  userId: z.string()
}).strict();

export const LabelUpdateManyMutationInputSchema: z.ZodType<Prisma.LabelUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LabelUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LabelUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskLabelCreateInputSchema: z.ZodType<Prisma.TaskLabelCreateInput> = z.object({
  task: z.lazy(() => TaskCreateNestedOneWithoutLabelsInputSchema),
  label: z.lazy(() => LabelCreateNestedOneWithoutTasksInputSchema)
}).strict();

export const TaskLabelUncheckedCreateInputSchema: z.ZodType<Prisma.TaskLabelUncheckedCreateInput> = z.object({
  taskId: z.string(),
  labelId: z.string()
}).strict();

export const TaskLabelUpdateInputSchema: z.ZodType<Prisma.TaskLabelUpdateInput> = z.object({
  task: z.lazy(() => TaskUpdateOneRequiredWithoutLabelsNestedInputSchema).optional(),
  label: z.lazy(() => LabelUpdateOneRequiredWithoutTasksNestedInputSchema).optional()
}).strict();

export const TaskLabelUncheckedUpdateInputSchema: z.ZodType<Prisma.TaskLabelUncheckedUpdateInput> = z.object({
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskLabelCreateManyInputSchema: z.ZodType<Prisma.TaskLabelCreateManyInput> = z.object({
  taskId: z.string(),
  labelId: z.string()
}).strict();

export const TaskLabelUpdateManyMutationInputSchema: z.ZodType<Prisma.TaskLabelUpdateManyMutationInput> = z.object({
}).strict();

export const TaskLabelUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TaskLabelUncheckedUpdateManyInput> = z.object({
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  labelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const EnumTaskStatusFilterSchema: z.ZodType<Prisma.EnumTaskStatusFilter> = z.object({
  equals: z.lazy(() => TaskStatusSchema).optional(),
  in: z.lazy(() => TaskStatusSchema).array().optional(),
  notIn: z.lazy(() => TaskStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => NestedEnumTaskStatusFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const EnumRecurrenceFrequencyNullableFilterSchema: z.ZodType<Prisma.EnumRecurrenceFrequencyNullableFilter> = z.object({
  equals: z.lazy(() => RecurrenceFrequencySchema).optional().nullable(),
  in: z.lazy(() => RecurrenceFrequencySchema).array().optional().nullable(),
  notIn: z.lazy(() => RecurrenceFrequencySchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => RecurrenceFrequencySchema),z.lazy(() => NestedEnumRecurrenceFrequencyNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  not: InputJsonValueSchema.optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserNullableScalarRelationFilterSchema: z.ZodType<Prisma.UserNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const CategoryNullableScalarRelationFilterSchema: z.ZodType<Prisma.CategoryNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => CategoryWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CategoryWhereInputSchema).optional().nullable()
}).strict();

export const TaskLabelListRelationFilterSchema: z.ZodType<Prisma.TaskLabelListRelationFilter> = z.object({
  every: z.lazy(() => TaskLabelWhereInputSchema).optional(),
  some: z.lazy(() => TaskLabelWhereInputSchema).optional(),
  none: z.lazy(() => TaskLabelWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const TaskLabelOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TaskLabelOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskCountOrderByAggregateInputSchema: z.ZodType<Prisma.TaskCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.lazy(() => SortOrderSchema).optional(),
  reminder: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  isRecurring: z.lazy(() => SortOrderSchema).optional(),
  frequency: z.lazy(() => SortOrderSchema).optional(),
  interval: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  daysOfWeek: z.lazy(() => SortOrderSchema).optional(),
  dayOfMonth: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  completedAt: z.lazy(() => SortOrderSchema).optional(),
  assigneeId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TaskAvgOrderByAggregateInput> = z.object({
  priority: z.lazy(() => SortOrderSchema).optional(),
  interval: z.lazy(() => SortOrderSchema).optional(),
  dayOfMonth: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TaskMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.lazy(() => SortOrderSchema).optional(),
  reminder: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  isRecurring: z.lazy(() => SortOrderSchema).optional(),
  frequency: z.lazy(() => SortOrderSchema).optional(),
  interval: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  dayOfMonth: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  completedAt: z.lazy(() => SortOrderSchema).optional(),
  assigneeId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskMinOrderByAggregateInputSchema: z.ZodType<Prisma.TaskMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.lazy(() => SortOrderSchema).optional(),
  reminder: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  isRecurring: z.lazy(() => SortOrderSchema).optional(),
  frequency: z.lazy(() => SortOrderSchema).optional(),
  interval: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  dayOfMonth: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  completedAt: z.lazy(() => SortOrderSchema).optional(),
  assigneeId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskSumOrderByAggregateInputSchema: z.ZodType<Prisma.TaskSumOrderByAggregateInput> = z.object({
  priority: z.lazy(() => SortOrderSchema).optional(),
  interval: z.lazy(() => SortOrderSchema).optional(),
  dayOfMonth: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const EnumTaskStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTaskStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TaskStatusSchema).optional(),
  in: z.lazy(() => TaskStatusSchema).array().optional(),
  notIn: z.lazy(() => TaskStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => NestedEnumTaskStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTaskStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTaskStatusFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const EnumRecurrenceFrequencyNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRecurrenceFrequencyNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RecurrenceFrequencySchema).optional().nullable(),
  in: z.lazy(() => RecurrenceFrequencySchema).array().optional().nullable(),
  notIn: z.lazy(() => RecurrenceFrequencySchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => RecurrenceFrequencySchema),z.lazy(() => NestedEnumRecurrenceFrequencyNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRecurrenceFrequencyNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRecurrenceFrequencyNullableFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  not: InputJsonValueSchema.optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const TaskListRelationFilterSchema: z.ZodType<Prisma.TaskListRelationFilter> = z.object({
  every: z.lazy(() => TaskWhereInputSchema).optional(),
  some: z.lazy(() => TaskWhereInputSchema).optional(),
  none: z.lazy(() => TaskWhereInputSchema).optional()
}).strict();

export const CategoryListRelationFilterSchema: z.ZodType<Prisma.CategoryListRelationFilter> = z.object({
  every: z.lazy(() => CategoryWhereInputSchema).optional(),
  some: z.lazy(() => CategoryWhereInputSchema).optional(),
  none: z.lazy(() => CategoryWhereInputSchema).optional()
}).strict();

export const LabelListRelationFilterSchema: z.ZodType<Prisma.LabelListRelationFilter> = z.object({
  every: z.lazy(() => LabelWhereInputSchema).optional(),
  some: z.lazy(() => LabelWhereInputSchema).optional(),
  none: z.lazy(() => LabelWhereInputSchema).optional()
}).strict();

export const TaskOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TaskOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CategoryOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LabelOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LabelOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const CategoryNameUserIdCompoundUniqueInputSchema: z.ZodType<Prisma.CategoryNameUserIdCompoundUniqueInput> = z.object({
  name: z.string(),
  userId: z.string()
}).strict();

export const CategoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LabelNameUserIdCompoundUniqueInputSchema: z.ZodType<Prisma.LabelNameUserIdCompoundUniqueInput> = z.object({
  name: z.string(),
  userId: z.string()
}).strict();

export const LabelCountOrderByAggregateInputSchema: z.ZodType<Prisma.LabelCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LabelMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LabelMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LabelMinOrderByAggregateInputSchema: z.ZodType<Prisma.LabelMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskScalarRelationFilterSchema: z.ZodType<Prisma.TaskScalarRelationFilter> = z.object({
  is: z.lazy(() => TaskWhereInputSchema).optional(),
  isNot: z.lazy(() => TaskWhereInputSchema).optional()
}).strict();

export const LabelScalarRelationFilterSchema: z.ZodType<Prisma.LabelScalarRelationFilter> = z.object({
  is: z.lazy(() => LabelWhereInputSchema).optional(),
  isNot: z.lazy(() => LabelWhereInputSchema).optional()
}).strict();

export const TaskLabelTaskIdLabelIdCompoundUniqueInputSchema: z.ZodType<Prisma.TaskLabelTaskIdLabelIdCompoundUniqueInput> = z.object({
  taskId: z.string(),
  labelId: z.string()
}).strict();

export const TaskLabelCountOrderByAggregateInputSchema: z.ZodType<Prisma.TaskLabelCountOrderByAggregateInput> = z.object({
  taskId: z.lazy(() => SortOrderSchema).optional(),
  labelId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskLabelMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TaskLabelMaxOrderByAggregateInput> = z.object({
  taskId: z.lazy(() => SortOrderSchema).optional(),
  labelId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskLabelMinOrderByAggregateInputSchema: z.ZodType<Prisma.TaskLabelMinOrderByAggregateInput> = z.object({
  taskId: z.lazy(() => SortOrderSchema).optional(),
  labelId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutTasksInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTasksInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CategoryCreateNestedOneWithoutTasksInputSchema: z.ZodType<Prisma.CategoryCreateNestedOneWithoutTasksInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutTasksInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional()
}).strict();

export const TaskLabelCreateNestedManyWithoutTaskInputSchema: z.ZodType<Prisma.TaskLabelCreateNestedManyWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => TaskLabelCreateWithoutTaskInputSchema),z.lazy(() => TaskLabelCreateWithoutTaskInputSchema).array(),z.lazy(() => TaskLabelUncheckedCreateWithoutTaskInputSchema),z.lazy(() => TaskLabelUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskLabelCreateOrConnectWithoutTaskInputSchema),z.lazy(() => TaskLabelCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskLabelCreateManyTaskInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskLabelWhereUniqueInputSchema),z.lazy(() => TaskLabelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskLabelUncheckedCreateNestedManyWithoutTaskInputSchema: z.ZodType<Prisma.TaskLabelUncheckedCreateNestedManyWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => TaskLabelCreateWithoutTaskInputSchema),z.lazy(() => TaskLabelCreateWithoutTaskInputSchema).array(),z.lazy(() => TaskLabelUncheckedCreateWithoutTaskInputSchema),z.lazy(() => TaskLabelUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskLabelCreateOrConnectWithoutTaskInputSchema),z.lazy(() => TaskLabelCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskLabelCreateManyTaskInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskLabelWhereUniqueInputSchema),z.lazy(() => TaskLabelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const EnumTaskStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTaskStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TaskStatusSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const NullableEnumRecurrenceFrequencyFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumRecurrenceFrequencyFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RecurrenceFrequencySchema).optional().nullable()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const UserUpdateOneWithoutTasksNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTasksInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTasksInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutTasksInputSchema),z.lazy(() => UserUpdateWithoutTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTasksInputSchema) ]).optional(),
}).strict();

export const CategoryUpdateOneWithoutTasksNestedInputSchema: z.ZodType<Prisma.CategoryUpdateOneWithoutTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutTasksInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutTasksInputSchema).optional(),
  upsert: z.lazy(() => CategoryUpsertWithoutTasksInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CategoryUpdateToOneWithWhereWithoutTasksInputSchema),z.lazy(() => CategoryUpdateWithoutTasksInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutTasksInputSchema) ]).optional(),
}).strict();

export const TaskLabelUpdateManyWithoutTaskNestedInputSchema: z.ZodType<Prisma.TaskLabelUpdateManyWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskLabelCreateWithoutTaskInputSchema),z.lazy(() => TaskLabelCreateWithoutTaskInputSchema).array(),z.lazy(() => TaskLabelUncheckedCreateWithoutTaskInputSchema),z.lazy(() => TaskLabelUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskLabelCreateOrConnectWithoutTaskInputSchema),z.lazy(() => TaskLabelCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskLabelUpsertWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => TaskLabelUpsertWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskLabelCreateManyTaskInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskLabelWhereUniqueInputSchema),z.lazy(() => TaskLabelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskLabelWhereUniqueInputSchema),z.lazy(() => TaskLabelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskLabelWhereUniqueInputSchema),z.lazy(() => TaskLabelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskLabelWhereUniqueInputSchema),z.lazy(() => TaskLabelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskLabelUpdateWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => TaskLabelUpdateWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskLabelUpdateManyWithWhereWithoutTaskInputSchema),z.lazy(() => TaskLabelUpdateManyWithWhereWithoutTaskInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskLabelScalarWhereInputSchema),z.lazy(() => TaskLabelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const TaskLabelUncheckedUpdateManyWithoutTaskNestedInputSchema: z.ZodType<Prisma.TaskLabelUncheckedUpdateManyWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskLabelCreateWithoutTaskInputSchema),z.lazy(() => TaskLabelCreateWithoutTaskInputSchema).array(),z.lazy(() => TaskLabelUncheckedCreateWithoutTaskInputSchema),z.lazy(() => TaskLabelUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskLabelCreateOrConnectWithoutTaskInputSchema),z.lazy(() => TaskLabelCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskLabelUpsertWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => TaskLabelUpsertWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskLabelCreateManyTaskInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskLabelWhereUniqueInputSchema),z.lazy(() => TaskLabelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskLabelWhereUniqueInputSchema),z.lazy(() => TaskLabelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskLabelWhereUniqueInputSchema),z.lazy(() => TaskLabelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskLabelWhereUniqueInputSchema),z.lazy(() => TaskLabelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskLabelUpdateWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => TaskLabelUpdateWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskLabelUpdateManyWithWhereWithoutTaskInputSchema),z.lazy(() => TaskLabelUpdateManyWithWhereWithoutTaskInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskLabelScalarWhereInputSchema),z.lazy(() => TaskLabelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskCreateNestedManyWithoutAssigneeInputSchema: z.ZodType<Prisma.TaskCreateNestedManyWithoutAssigneeInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutAssigneeInputSchema),z.lazy(() => TaskCreateWithoutAssigneeInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutAssigneeInputSchema),z.lazy(() => TaskUncheckedCreateWithoutAssigneeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutAssigneeInputSchema),z.lazy(() => TaskCreateOrConnectWithoutAssigneeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyAssigneeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CategoryCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CategoryCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutUserInputSchema),z.lazy(() => CategoryCreateWithoutUserInputSchema).array(),z.lazy(() => CategoryUncheckedCreateWithoutUserInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoryCreateOrConnectWithoutUserInputSchema),z.lazy(() => CategoryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CategoryCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LabelCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.LabelCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => LabelCreateWithoutUserInputSchema),z.lazy(() => LabelCreateWithoutUserInputSchema).array(),z.lazy(() => LabelUncheckedCreateWithoutUserInputSchema),z.lazy(() => LabelUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LabelCreateOrConnectWithoutUserInputSchema),z.lazy(() => LabelCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LabelCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LabelWhereUniqueInputSchema),z.lazy(() => LabelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskUncheckedCreateNestedManyWithoutAssigneeInputSchema: z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutAssigneeInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutAssigneeInputSchema),z.lazy(() => TaskCreateWithoutAssigneeInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutAssigneeInputSchema),z.lazy(() => TaskUncheckedCreateWithoutAssigneeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutAssigneeInputSchema),z.lazy(() => TaskCreateOrConnectWithoutAssigneeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyAssigneeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CategoryUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutUserInputSchema),z.lazy(() => CategoryCreateWithoutUserInputSchema).array(),z.lazy(() => CategoryUncheckedCreateWithoutUserInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoryCreateOrConnectWithoutUserInputSchema),z.lazy(() => CategoryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CategoryCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LabelUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.LabelUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => LabelCreateWithoutUserInputSchema),z.lazy(() => LabelCreateWithoutUserInputSchema).array(),z.lazy(() => LabelUncheckedCreateWithoutUserInputSchema),z.lazy(() => LabelUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LabelCreateOrConnectWithoutUserInputSchema),z.lazy(() => LabelCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LabelCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LabelWhereUniqueInputSchema),z.lazy(() => LabelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskUpdateManyWithoutAssigneeNestedInputSchema: z.ZodType<Prisma.TaskUpdateManyWithoutAssigneeNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutAssigneeInputSchema),z.lazy(() => TaskCreateWithoutAssigneeInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutAssigneeInputSchema),z.lazy(() => TaskUncheckedCreateWithoutAssigneeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutAssigneeInputSchema),z.lazy(() => TaskCreateOrConnectWithoutAssigneeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutAssigneeInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutAssigneeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyAssigneeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutAssigneeInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutAssigneeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutAssigneeInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutAssigneeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CategoryUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CategoryUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutUserInputSchema),z.lazy(() => CategoryCreateWithoutUserInputSchema).array(),z.lazy(() => CategoryUncheckedCreateWithoutUserInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoryCreateOrConnectWithoutUserInputSchema),z.lazy(() => CategoryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CategoryUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CategoryUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CategoryCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CategoryUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CategoryUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CategoryUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CategoryUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CategoryScalarWhereInputSchema),z.lazy(() => CategoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LabelUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.LabelUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => LabelCreateWithoutUserInputSchema),z.lazy(() => LabelCreateWithoutUserInputSchema).array(),z.lazy(() => LabelUncheckedCreateWithoutUserInputSchema),z.lazy(() => LabelUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LabelCreateOrConnectWithoutUserInputSchema),z.lazy(() => LabelCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LabelUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LabelUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LabelCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LabelWhereUniqueInputSchema),z.lazy(() => LabelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LabelWhereUniqueInputSchema),z.lazy(() => LabelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LabelWhereUniqueInputSchema),z.lazy(() => LabelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LabelWhereUniqueInputSchema),z.lazy(() => LabelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LabelUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LabelUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LabelUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => LabelUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LabelScalarWhereInputSchema),z.lazy(() => LabelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyWithoutAssigneeNestedInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutAssigneeNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutAssigneeInputSchema),z.lazy(() => TaskCreateWithoutAssigneeInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutAssigneeInputSchema),z.lazy(() => TaskUncheckedCreateWithoutAssigneeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutAssigneeInputSchema),z.lazy(() => TaskCreateOrConnectWithoutAssigneeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutAssigneeInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutAssigneeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyAssigneeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutAssigneeInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutAssigneeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutAssigneeInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutAssigneeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CategoryUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutUserInputSchema),z.lazy(() => CategoryCreateWithoutUserInputSchema).array(),z.lazy(() => CategoryUncheckedCreateWithoutUserInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoryCreateOrConnectWithoutUserInputSchema),z.lazy(() => CategoryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CategoryUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CategoryUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CategoryCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CategoryUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CategoryUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CategoryUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CategoryUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CategoryScalarWhereInputSchema),z.lazy(() => CategoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LabelUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.LabelUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => LabelCreateWithoutUserInputSchema),z.lazy(() => LabelCreateWithoutUserInputSchema).array(),z.lazy(() => LabelUncheckedCreateWithoutUserInputSchema),z.lazy(() => LabelUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LabelCreateOrConnectWithoutUserInputSchema),z.lazy(() => LabelCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LabelUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LabelUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LabelCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LabelWhereUniqueInputSchema),z.lazy(() => LabelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LabelWhereUniqueInputSchema),z.lazy(() => LabelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LabelWhereUniqueInputSchema),z.lazy(() => LabelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LabelWhereUniqueInputSchema),z.lazy(() => LabelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LabelUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LabelUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LabelUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => LabelUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LabelScalarWhereInputSchema),z.lazy(() => LabelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.TaskCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutCategoryInputSchema),z.lazy(() => TaskCreateWithoutCategoryInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => TaskUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => TaskCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCategoryInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCategoryInputSchema),z.lazy(() => UserUncheckedCreateWithoutCategoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCategoryInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const TaskUncheckedCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutCategoryInputSchema),z.lazy(() => TaskCreateWithoutCategoryInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => TaskUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => TaskCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.TaskUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutCategoryInputSchema),z.lazy(() => TaskCreateWithoutCategoryInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => TaskUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => TaskCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutCategoryNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCategoryInputSchema),z.lazy(() => UserUncheckedCreateWithoutCategoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCategoryInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCategoryInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCategoryInputSchema),z.lazy(() => UserUpdateWithoutCategoryInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCategoryInputSchema) ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutCategoryInputSchema),z.lazy(() => TaskCreateWithoutCategoryInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => TaskUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => TaskCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskLabelCreateNestedManyWithoutLabelInputSchema: z.ZodType<Prisma.TaskLabelCreateNestedManyWithoutLabelInput> = z.object({
  create: z.union([ z.lazy(() => TaskLabelCreateWithoutLabelInputSchema),z.lazy(() => TaskLabelCreateWithoutLabelInputSchema).array(),z.lazy(() => TaskLabelUncheckedCreateWithoutLabelInputSchema),z.lazy(() => TaskLabelUncheckedCreateWithoutLabelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskLabelCreateOrConnectWithoutLabelInputSchema),z.lazy(() => TaskLabelCreateOrConnectWithoutLabelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskLabelCreateManyLabelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskLabelWhereUniqueInputSchema),z.lazy(() => TaskLabelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutLabelInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutLabelInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLabelInputSchema),z.lazy(() => UserUncheckedCreateWithoutLabelInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLabelInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const TaskLabelUncheckedCreateNestedManyWithoutLabelInputSchema: z.ZodType<Prisma.TaskLabelUncheckedCreateNestedManyWithoutLabelInput> = z.object({
  create: z.union([ z.lazy(() => TaskLabelCreateWithoutLabelInputSchema),z.lazy(() => TaskLabelCreateWithoutLabelInputSchema).array(),z.lazy(() => TaskLabelUncheckedCreateWithoutLabelInputSchema),z.lazy(() => TaskLabelUncheckedCreateWithoutLabelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskLabelCreateOrConnectWithoutLabelInputSchema),z.lazy(() => TaskLabelCreateOrConnectWithoutLabelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskLabelCreateManyLabelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskLabelWhereUniqueInputSchema),z.lazy(() => TaskLabelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskLabelUpdateManyWithoutLabelNestedInputSchema: z.ZodType<Prisma.TaskLabelUpdateManyWithoutLabelNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskLabelCreateWithoutLabelInputSchema),z.lazy(() => TaskLabelCreateWithoutLabelInputSchema).array(),z.lazy(() => TaskLabelUncheckedCreateWithoutLabelInputSchema),z.lazy(() => TaskLabelUncheckedCreateWithoutLabelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskLabelCreateOrConnectWithoutLabelInputSchema),z.lazy(() => TaskLabelCreateOrConnectWithoutLabelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskLabelUpsertWithWhereUniqueWithoutLabelInputSchema),z.lazy(() => TaskLabelUpsertWithWhereUniqueWithoutLabelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskLabelCreateManyLabelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskLabelWhereUniqueInputSchema),z.lazy(() => TaskLabelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskLabelWhereUniqueInputSchema),z.lazy(() => TaskLabelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskLabelWhereUniqueInputSchema),z.lazy(() => TaskLabelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskLabelWhereUniqueInputSchema),z.lazy(() => TaskLabelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskLabelUpdateWithWhereUniqueWithoutLabelInputSchema),z.lazy(() => TaskLabelUpdateWithWhereUniqueWithoutLabelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskLabelUpdateManyWithWhereWithoutLabelInputSchema),z.lazy(() => TaskLabelUpdateManyWithWhereWithoutLabelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskLabelScalarWhereInputSchema),z.lazy(() => TaskLabelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutLabelNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutLabelNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLabelInputSchema),z.lazy(() => UserUncheckedCreateWithoutLabelInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLabelInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutLabelInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutLabelInputSchema),z.lazy(() => UserUpdateWithoutLabelInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLabelInputSchema) ]).optional(),
}).strict();

export const TaskLabelUncheckedUpdateManyWithoutLabelNestedInputSchema: z.ZodType<Prisma.TaskLabelUncheckedUpdateManyWithoutLabelNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskLabelCreateWithoutLabelInputSchema),z.lazy(() => TaskLabelCreateWithoutLabelInputSchema).array(),z.lazy(() => TaskLabelUncheckedCreateWithoutLabelInputSchema),z.lazy(() => TaskLabelUncheckedCreateWithoutLabelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskLabelCreateOrConnectWithoutLabelInputSchema),z.lazy(() => TaskLabelCreateOrConnectWithoutLabelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskLabelUpsertWithWhereUniqueWithoutLabelInputSchema),z.lazy(() => TaskLabelUpsertWithWhereUniqueWithoutLabelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskLabelCreateManyLabelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskLabelWhereUniqueInputSchema),z.lazy(() => TaskLabelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskLabelWhereUniqueInputSchema),z.lazy(() => TaskLabelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskLabelWhereUniqueInputSchema),z.lazy(() => TaskLabelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskLabelWhereUniqueInputSchema),z.lazy(() => TaskLabelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskLabelUpdateWithWhereUniqueWithoutLabelInputSchema),z.lazy(() => TaskLabelUpdateWithWhereUniqueWithoutLabelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskLabelUpdateManyWithWhereWithoutLabelInputSchema),z.lazy(() => TaskLabelUpdateManyWithWhereWithoutLabelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskLabelScalarWhereInputSchema),z.lazy(() => TaskLabelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskCreateNestedOneWithoutLabelsInputSchema: z.ZodType<Prisma.TaskCreateNestedOneWithoutLabelsInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutLabelsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutLabelsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutLabelsInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional()
}).strict();

export const LabelCreateNestedOneWithoutTasksInputSchema: z.ZodType<Prisma.LabelCreateNestedOneWithoutTasksInput> = z.object({
  create: z.union([ z.lazy(() => LabelCreateWithoutTasksInputSchema),z.lazy(() => LabelUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LabelCreateOrConnectWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => LabelWhereUniqueInputSchema).optional()
}).strict();

export const TaskUpdateOneRequiredWithoutLabelsNestedInputSchema: z.ZodType<Prisma.TaskUpdateOneRequiredWithoutLabelsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutLabelsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutLabelsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutLabelsInputSchema).optional(),
  upsert: z.lazy(() => TaskUpsertWithoutLabelsInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TaskUpdateToOneWithWhereWithoutLabelsInputSchema),z.lazy(() => TaskUpdateWithoutLabelsInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutLabelsInputSchema) ]).optional(),
}).strict();

export const LabelUpdateOneRequiredWithoutTasksNestedInputSchema: z.ZodType<Prisma.LabelUpdateOneRequiredWithoutTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => LabelCreateWithoutTasksInputSchema),z.lazy(() => LabelUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LabelCreateOrConnectWithoutTasksInputSchema).optional(),
  upsert: z.lazy(() => LabelUpsertWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => LabelWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LabelUpdateToOneWithWhereWithoutTasksInputSchema),z.lazy(() => LabelUpdateWithoutTasksInputSchema),z.lazy(() => LabelUncheckedUpdateWithoutTasksInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedEnumTaskStatusFilterSchema: z.ZodType<Prisma.NestedEnumTaskStatusFilter> = z.object({
  equals: z.lazy(() => TaskStatusSchema).optional(),
  in: z.lazy(() => TaskStatusSchema).array().optional(),
  notIn: z.lazy(() => TaskStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => NestedEnumTaskStatusFilterSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedEnumRecurrenceFrequencyNullableFilterSchema: z.ZodType<Prisma.NestedEnumRecurrenceFrequencyNullableFilter> = z.object({
  equals: z.lazy(() => RecurrenceFrequencySchema).optional().nullable(),
  in: z.lazy(() => RecurrenceFrequencySchema).array().optional().nullable(),
  notIn: z.lazy(() => RecurrenceFrequencySchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => RecurrenceFrequencySchema),z.lazy(() => NestedEnumRecurrenceFrequencyNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedEnumTaskStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTaskStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TaskStatusSchema).optional(),
  in: z.lazy(() => TaskStatusSchema).array().optional(),
  notIn: z.lazy(() => TaskStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => NestedEnumTaskStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTaskStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTaskStatusFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumRecurrenceFrequencyNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRecurrenceFrequencyNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RecurrenceFrequencySchema).optional().nullable(),
  in: z.lazy(() => RecurrenceFrequencySchema).array().optional().nullable(),
  notIn: z.lazy(() => RecurrenceFrequencySchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => RecurrenceFrequencySchema),z.lazy(() => NestedEnumRecurrenceFrequencyNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRecurrenceFrequencyNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRecurrenceFrequencyNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  not: InputJsonValueSchema.optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const UserCreateWithoutTasksInputSchema: z.ZodType<Prisma.UserCreateWithoutTasksInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  email: z.string(),
  Category: z.lazy(() => CategoryCreateNestedManyWithoutUserInputSchema).optional(),
  Label: z.lazy(() => LabelCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutTasksInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTasksInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  email: z.string(),
  Category: z.lazy(() => CategoryUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Label: z.lazy(() => LabelUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutTasksInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTasksInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema) ]),
}).strict();

export const CategoryCreateWithoutTasksInputSchema: z.ZodType<Prisma.CategoryCreateWithoutTasksInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutCategoryInputSchema)
}).strict();

export const CategoryUncheckedCreateWithoutTasksInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutTasksInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  userId: z.string()
}).strict();

export const CategoryCreateOrConnectWithoutTasksInputSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutTasksInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoryCreateWithoutTasksInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutTasksInputSchema) ]),
}).strict();

export const TaskLabelCreateWithoutTaskInputSchema: z.ZodType<Prisma.TaskLabelCreateWithoutTaskInput> = z.object({
  label: z.lazy(() => LabelCreateNestedOneWithoutTasksInputSchema)
}).strict();

export const TaskLabelUncheckedCreateWithoutTaskInputSchema: z.ZodType<Prisma.TaskLabelUncheckedCreateWithoutTaskInput> = z.object({
  labelId: z.string()
}).strict();

export const TaskLabelCreateOrConnectWithoutTaskInputSchema: z.ZodType<Prisma.TaskLabelCreateOrConnectWithoutTaskInput> = z.object({
  where: z.lazy(() => TaskLabelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskLabelCreateWithoutTaskInputSchema),z.lazy(() => TaskLabelUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export const TaskLabelCreateManyTaskInputEnvelopeSchema: z.ZodType<Prisma.TaskLabelCreateManyTaskInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskLabelCreateManyTaskInputSchema),z.lazy(() => TaskLabelCreateManyTaskInputSchema).array() ]),
}).strict();

export const UserUpsertWithoutTasksInputSchema: z.ZodType<Prisma.UserUpsertWithoutTasksInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTasksInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutTasksInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTasksInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTasksInputSchema) ]),
}).strict();

export const UserUpdateWithoutTasksInputSchema: z.ZodType<Prisma.UserUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Category: z.lazy(() => CategoryUpdateManyWithoutUserNestedInputSchema).optional(),
  Label: z.lazy(() => LabelUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutTasksInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Category: z.lazy(() => CategoryUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Label: z.lazy(() => LabelUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const CategoryUpsertWithoutTasksInputSchema: z.ZodType<Prisma.CategoryUpsertWithoutTasksInput> = z.object({
  update: z.union([ z.lazy(() => CategoryUpdateWithoutTasksInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutTasksInputSchema) ]),
  create: z.union([ z.lazy(() => CategoryCreateWithoutTasksInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutTasksInputSchema) ]),
  where: z.lazy(() => CategoryWhereInputSchema).optional()
}).strict();

export const CategoryUpdateToOneWithWhereWithoutTasksInputSchema: z.ZodType<Prisma.CategoryUpdateToOneWithWhereWithoutTasksInput> = z.object({
  where: z.lazy(() => CategoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CategoryUpdateWithoutTasksInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutTasksInputSchema) ]),
}).strict();

export const CategoryUpdateWithoutTasksInputSchema: z.ZodType<Prisma.CategoryUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateWithoutTasksInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskLabelUpsertWithWhereUniqueWithoutTaskInputSchema: z.ZodType<Prisma.TaskLabelUpsertWithWhereUniqueWithoutTaskInput> = z.object({
  where: z.lazy(() => TaskLabelWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskLabelUpdateWithoutTaskInputSchema),z.lazy(() => TaskLabelUncheckedUpdateWithoutTaskInputSchema) ]),
  create: z.union([ z.lazy(() => TaskLabelCreateWithoutTaskInputSchema),z.lazy(() => TaskLabelUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export const TaskLabelUpdateWithWhereUniqueWithoutTaskInputSchema: z.ZodType<Prisma.TaskLabelUpdateWithWhereUniqueWithoutTaskInput> = z.object({
  where: z.lazy(() => TaskLabelWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskLabelUpdateWithoutTaskInputSchema),z.lazy(() => TaskLabelUncheckedUpdateWithoutTaskInputSchema) ]),
}).strict();

export const TaskLabelUpdateManyWithWhereWithoutTaskInputSchema: z.ZodType<Prisma.TaskLabelUpdateManyWithWhereWithoutTaskInput> = z.object({
  where: z.lazy(() => TaskLabelScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskLabelUpdateManyMutationInputSchema),z.lazy(() => TaskLabelUncheckedUpdateManyWithoutTaskInputSchema) ]),
}).strict();

export const TaskLabelScalarWhereInputSchema: z.ZodType<Prisma.TaskLabelScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskLabelScalarWhereInputSchema),z.lazy(() => TaskLabelScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskLabelScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskLabelScalarWhereInputSchema),z.lazy(() => TaskLabelScalarWhereInputSchema).array() ]).optional(),
  taskId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  labelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const TaskCreateWithoutAssigneeInputSchema: z.ZodType<Prisma.TaskCreateWithoutAssigneeInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  status: z.lazy(() => TaskStatusSchema),
  priority: z.number().int(),
  dueDate: z.coerce.date().optional().nullable(),
  reminder: z.coerce.date().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  isRecurring: z.boolean().optional(),
  frequency: z.lazy(() => RecurrenceFrequencySchema).optional().nullable(),
  interval: z.number().int().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  completedAt: z.coerce.date().optional().nullable(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutTasksInputSchema).optional(),
  labels: z.lazy(() => TaskLabelCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUncheckedCreateWithoutAssigneeInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutAssigneeInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  status: z.lazy(() => TaskStatusSchema),
  priority: z.number().int(),
  dueDate: z.coerce.date().optional().nullable(),
  reminder: z.coerce.date().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  isRecurring: z.boolean().optional(),
  frequency: z.lazy(() => RecurrenceFrequencySchema).optional().nullable(),
  interval: z.number().int().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  completedAt: z.coerce.date().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  labels: z.lazy(() => TaskLabelUncheckedCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskCreateOrConnectWithoutAssigneeInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutAssigneeInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutAssigneeInputSchema),z.lazy(() => TaskUncheckedCreateWithoutAssigneeInputSchema) ]),
}).strict();

export const TaskCreateManyAssigneeInputEnvelopeSchema: z.ZodType<Prisma.TaskCreateManyAssigneeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskCreateManyAssigneeInputSchema),z.lazy(() => TaskCreateManyAssigneeInputSchema).array() ]),
}).strict();

export const CategoryCreateWithoutUserInputSchema: z.ZodType<Prisma.CategoryCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoryCreateWithoutUserInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CategoryCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.CategoryCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CategoryCreateManyUserInputSchema),z.lazy(() => CategoryCreateManyUserInputSchema).array() ]),
}).strict();

export const LabelCreateWithoutUserInputSchema: z.ZodType<Prisma.LabelCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  tasks: z.lazy(() => TaskLabelCreateNestedManyWithoutLabelInputSchema).optional()
}).strict();

export const LabelUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.LabelUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  tasks: z.lazy(() => TaskLabelUncheckedCreateNestedManyWithoutLabelInputSchema).optional()
}).strict();

export const LabelCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.LabelCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => LabelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LabelCreateWithoutUserInputSchema),z.lazy(() => LabelUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const LabelCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.LabelCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LabelCreateManyUserInputSchema),z.lazy(() => LabelCreateManyUserInputSchema).array() ]),
}).strict();

export const TaskUpsertWithWhereUniqueWithoutAssigneeInputSchema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutAssigneeInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskUpdateWithoutAssigneeInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutAssigneeInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutAssigneeInputSchema),z.lazy(() => TaskUncheckedCreateWithoutAssigneeInputSchema) ]),
}).strict();

export const TaskUpdateWithWhereUniqueWithoutAssigneeInputSchema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutAssigneeInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateWithoutAssigneeInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutAssigneeInputSchema) ]),
}).strict();

export const TaskUpdateManyWithWhereWithoutAssigneeInputSchema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutAssigneeInput> = z.object({
  where: z.lazy(() => TaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateManyMutationInputSchema),z.lazy(() => TaskUncheckedUpdateManyWithoutAssigneeInputSchema) ]),
}).strict();

export const TaskScalarWhereInputSchema: z.ZodType<Prisma.TaskScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumTaskStatusFilterSchema),z.lazy(() => TaskStatusSchema) ]).optional(),
  priority: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  dueDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  reminder: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  startTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  endTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  isRecurring: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  frequency: z.union([ z.lazy(() => EnumRecurrenceFrequencyNullableFilterSchema),z.lazy(() => RecurrenceFrequencySchema) ]).optional().nullable(),
  interval: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  endDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  daysOfWeek: z.lazy(() => JsonNullableFilterSchema).optional(),
  dayOfMonth: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  completedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  assigneeId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  categoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CategoryUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CategoryUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CategoryUpdateWithoutUserInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => CategoryCreateWithoutUserInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CategoryUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CategoryUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CategoryUpdateWithoutUserInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const CategoryUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.CategoryUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => CategoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CategoryUpdateManyMutationInputSchema),z.lazy(() => CategoryUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const CategoryScalarWhereInputSchema: z.ZodType<Prisma.CategoryScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryScalarWhereInputSchema),z.lazy(() => CategoryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryScalarWhereInputSchema),z.lazy(() => CategoryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const LabelUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.LabelUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => LabelWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LabelUpdateWithoutUserInputSchema),z.lazy(() => LabelUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => LabelCreateWithoutUserInputSchema),z.lazy(() => LabelUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const LabelUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.LabelUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => LabelWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LabelUpdateWithoutUserInputSchema),z.lazy(() => LabelUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const LabelUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.LabelUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => LabelScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LabelUpdateManyMutationInputSchema),z.lazy(() => LabelUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const LabelScalarWhereInputSchema: z.ZodType<Prisma.LabelScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LabelScalarWhereInputSchema),z.lazy(() => LabelScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LabelScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LabelScalarWhereInputSchema),z.lazy(() => LabelScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  color: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const TaskCreateWithoutCategoryInputSchema: z.ZodType<Prisma.TaskCreateWithoutCategoryInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  status: z.lazy(() => TaskStatusSchema),
  priority: z.number().int(),
  dueDate: z.coerce.date().optional().nullable(),
  reminder: z.coerce.date().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  isRecurring: z.boolean().optional(),
  frequency: z.lazy(() => RecurrenceFrequencySchema).optional().nullable(),
  interval: z.number().int().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  completedAt: z.coerce.date().optional().nullable(),
  assignee: z.lazy(() => UserCreateNestedOneWithoutTasksInputSchema).optional(),
  labels: z.lazy(() => TaskLabelCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutCategoryInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  status: z.lazy(() => TaskStatusSchema),
  priority: z.number().int(),
  dueDate: z.coerce.date().optional().nullable(),
  reminder: z.coerce.date().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  isRecurring: z.boolean().optional(),
  frequency: z.lazy(() => RecurrenceFrequencySchema).optional().nullable(),
  interval: z.number().int().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  completedAt: z.coerce.date().optional().nullable(),
  assigneeId: z.string().optional().nullable(),
  labels: z.lazy(() => TaskLabelUncheckedCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutCategoryInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutCategoryInputSchema),z.lazy(() => TaskUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const TaskCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.TaskCreateManyCategoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskCreateManyCategoryInputSchema),z.lazy(() => TaskCreateManyCategoryInputSchema).array() ]),
}).strict();

export const UserCreateWithoutCategoryInputSchema: z.ZodType<Prisma.UserCreateWithoutCategoryInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  email: z.string(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutAssigneeInputSchema).optional(),
  Label: z.lazy(() => LabelCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCategoryInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  email: z.string(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutAssigneeInputSchema).optional(),
  Label: z.lazy(() => LabelUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCategoryInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCategoryInputSchema),z.lazy(() => UserUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const TaskUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskUpdateWithoutCategoryInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutCategoryInputSchema),z.lazy(() => TaskUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const TaskUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateWithoutCategoryInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutCategoryInputSchema) ]),
}).strict();

export const TaskUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => TaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateManyMutationInputSchema),z.lazy(() => TaskUncheckedUpdateManyWithoutCategoryInputSchema) ]),
}).strict();

export const UserUpsertWithoutCategoryInputSchema: z.ZodType<Prisma.UserUpsertWithoutCategoryInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCategoryInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCategoryInputSchema),z.lazy(() => UserUncheckedCreateWithoutCategoryInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCategoryInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCategoryInputSchema) ]),
}).strict();

export const UserUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.UserUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  Label: z.lazy(() => LabelUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  Label: z.lazy(() => LabelUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const TaskLabelCreateWithoutLabelInputSchema: z.ZodType<Prisma.TaskLabelCreateWithoutLabelInput> = z.object({
  task: z.lazy(() => TaskCreateNestedOneWithoutLabelsInputSchema)
}).strict();

export const TaskLabelUncheckedCreateWithoutLabelInputSchema: z.ZodType<Prisma.TaskLabelUncheckedCreateWithoutLabelInput> = z.object({
  taskId: z.string()
}).strict();

export const TaskLabelCreateOrConnectWithoutLabelInputSchema: z.ZodType<Prisma.TaskLabelCreateOrConnectWithoutLabelInput> = z.object({
  where: z.lazy(() => TaskLabelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskLabelCreateWithoutLabelInputSchema),z.lazy(() => TaskLabelUncheckedCreateWithoutLabelInputSchema) ]),
}).strict();

export const TaskLabelCreateManyLabelInputEnvelopeSchema: z.ZodType<Prisma.TaskLabelCreateManyLabelInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskLabelCreateManyLabelInputSchema),z.lazy(() => TaskLabelCreateManyLabelInputSchema).array() ]),
}).strict();

export const UserCreateWithoutLabelInputSchema: z.ZodType<Prisma.UserCreateWithoutLabelInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  email: z.string(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutAssigneeInputSchema).optional(),
  Category: z.lazy(() => CategoryCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutLabelInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutLabelInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  email: z.string(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutAssigneeInputSchema).optional(),
  Category: z.lazy(() => CategoryUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutLabelInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutLabelInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutLabelInputSchema),z.lazy(() => UserUncheckedCreateWithoutLabelInputSchema) ]),
}).strict();

export const TaskLabelUpsertWithWhereUniqueWithoutLabelInputSchema: z.ZodType<Prisma.TaskLabelUpsertWithWhereUniqueWithoutLabelInput> = z.object({
  where: z.lazy(() => TaskLabelWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskLabelUpdateWithoutLabelInputSchema),z.lazy(() => TaskLabelUncheckedUpdateWithoutLabelInputSchema) ]),
  create: z.union([ z.lazy(() => TaskLabelCreateWithoutLabelInputSchema),z.lazy(() => TaskLabelUncheckedCreateWithoutLabelInputSchema) ]),
}).strict();

export const TaskLabelUpdateWithWhereUniqueWithoutLabelInputSchema: z.ZodType<Prisma.TaskLabelUpdateWithWhereUniqueWithoutLabelInput> = z.object({
  where: z.lazy(() => TaskLabelWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskLabelUpdateWithoutLabelInputSchema),z.lazy(() => TaskLabelUncheckedUpdateWithoutLabelInputSchema) ]),
}).strict();

export const TaskLabelUpdateManyWithWhereWithoutLabelInputSchema: z.ZodType<Prisma.TaskLabelUpdateManyWithWhereWithoutLabelInput> = z.object({
  where: z.lazy(() => TaskLabelScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskLabelUpdateManyMutationInputSchema),z.lazy(() => TaskLabelUncheckedUpdateManyWithoutLabelInputSchema) ]),
}).strict();

export const UserUpsertWithoutLabelInputSchema: z.ZodType<Prisma.UserUpsertWithoutLabelInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutLabelInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLabelInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutLabelInputSchema),z.lazy(() => UserUncheckedCreateWithoutLabelInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutLabelInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutLabelInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutLabelInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLabelInputSchema) ]),
}).strict();

export const UserUpdateWithoutLabelInputSchema: z.ZodType<Prisma.UserUpdateWithoutLabelInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  Category: z.lazy(() => CategoryUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutLabelInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutLabelInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  Category: z.lazy(() => CategoryUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const TaskCreateWithoutLabelsInputSchema: z.ZodType<Prisma.TaskCreateWithoutLabelsInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  status: z.lazy(() => TaskStatusSchema),
  priority: z.number().int(),
  dueDate: z.coerce.date().optional().nullable(),
  reminder: z.coerce.date().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  isRecurring: z.boolean().optional(),
  frequency: z.lazy(() => RecurrenceFrequencySchema).optional().nullable(),
  interval: z.number().int().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  completedAt: z.coerce.date().optional().nullable(),
  assignee: z.lazy(() => UserCreateNestedOneWithoutTasksInputSchema).optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutTasksInputSchema).optional()
}).strict();

export const TaskUncheckedCreateWithoutLabelsInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutLabelsInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  status: z.lazy(() => TaskStatusSchema),
  priority: z.number().int(),
  dueDate: z.coerce.date().optional().nullable(),
  reminder: z.coerce.date().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  isRecurring: z.boolean().optional(),
  frequency: z.lazy(() => RecurrenceFrequencySchema).optional().nullable(),
  interval: z.number().int().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  completedAt: z.coerce.date().optional().nullable(),
  assigneeId: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable()
}).strict();

export const TaskCreateOrConnectWithoutLabelsInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutLabelsInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutLabelsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutLabelsInputSchema) ]),
}).strict();

export const LabelCreateWithoutTasksInputSchema: z.ZodType<Prisma.LabelCreateWithoutTasksInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutLabelInputSchema)
}).strict();

export const LabelUncheckedCreateWithoutTasksInputSchema: z.ZodType<Prisma.LabelUncheckedCreateWithoutTasksInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  userId: z.string()
}).strict();

export const LabelCreateOrConnectWithoutTasksInputSchema: z.ZodType<Prisma.LabelCreateOrConnectWithoutTasksInput> = z.object({
  where: z.lazy(() => LabelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LabelCreateWithoutTasksInputSchema),z.lazy(() => LabelUncheckedCreateWithoutTasksInputSchema) ]),
}).strict();

export const TaskUpsertWithoutLabelsInputSchema: z.ZodType<Prisma.TaskUpsertWithoutLabelsInput> = z.object({
  update: z.union([ z.lazy(() => TaskUpdateWithoutLabelsInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutLabelsInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutLabelsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutLabelsInputSchema) ]),
  where: z.lazy(() => TaskWhereInputSchema).optional()
}).strict();

export const TaskUpdateToOneWithWhereWithoutLabelsInputSchema: z.ZodType<Prisma.TaskUpdateToOneWithWhereWithoutLabelsInput> = z.object({
  where: z.lazy(() => TaskWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TaskUpdateWithoutLabelsInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutLabelsInputSchema) ]),
}).strict();

export const TaskUpdateWithoutLabelsInputSchema: z.ZodType<Prisma.TaskUpdateWithoutLabelsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reminder: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRecurring: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  frequency: z.union([ z.lazy(() => RecurrenceFrequencySchema),z.lazy(() => NullableEnumRecurrenceFrequencyFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interval: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assignee: z.lazy(() => UserUpdateOneWithoutTasksNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneWithoutTasksNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateWithoutLabelsInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutLabelsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reminder: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRecurring: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  frequency: z.union([ z.lazy(() => RecurrenceFrequencySchema),z.lazy(() => NullableEnumRecurrenceFrequencyFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interval: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assigneeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LabelUpsertWithoutTasksInputSchema: z.ZodType<Prisma.LabelUpsertWithoutTasksInput> = z.object({
  update: z.union([ z.lazy(() => LabelUpdateWithoutTasksInputSchema),z.lazy(() => LabelUncheckedUpdateWithoutTasksInputSchema) ]),
  create: z.union([ z.lazy(() => LabelCreateWithoutTasksInputSchema),z.lazy(() => LabelUncheckedCreateWithoutTasksInputSchema) ]),
  where: z.lazy(() => LabelWhereInputSchema).optional()
}).strict();

export const LabelUpdateToOneWithWhereWithoutTasksInputSchema: z.ZodType<Prisma.LabelUpdateToOneWithWhereWithoutTasksInput> = z.object({
  where: z.lazy(() => LabelWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => LabelUpdateWithoutTasksInputSchema),z.lazy(() => LabelUncheckedUpdateWithoutTasksInputSchema) ]),
}).strict();

export const LabelUpdateWithoutTasksInputSchema: z.ZodType<Prisma.LabelUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLabelNestedInputSchema).optional()
}).strict();

export const LabelUncheckedUpdateWithoutTasksInputSchema: z.ZodType<Prisma.LabelUncheckedUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskLabelCreateManyTaskInputSchema: z.ZodType<Prisma.TaskLabelCreateManyTaskInput> = z.object({
  labelId: z.string()
}).strict();

export const TaskLabelUpdateWithoutTaskInputSchema: z.ZodType<Prisma.TaskLabelUpdateWithoutTaskInput> = z.object({
  label: z.lazy(() => LabelUpdateOneRequiredWithoutTasksNestedInputSchema).optional()
}).strict();

export const TaskLabelUncheckedUpdateWithoutTaskInputSchema: z.ZodType<Prisma.TaskLabelUncheckedUpdateWithoutTaskInput> = z.object({
  labelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskLabelUncheckedUpdateManyWithoutTaskInputSchema: z.ZodType<Prisma.TaskLabelUncheckedUpdateManyWithoutTaskInput> = z.object({
  labelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskCreateManyAssigneeInputSchema: z.ZodType<Prisma.TaskCreateManyAssigneeInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  status: z.lazy(() => TaskStatusSchema),
  priority: z.number().int(),
  dueDate: z.coerce.date().optional().nullable(),
  reminder: z.coerce.date().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  isRecurring: z.boolean().optional(),
  frequency: z.lazy(() => RecurrenceFrequencySchema).optional().nullable(),
  interval: z.number().int().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  completedAt: z.coerce.date().optional().nullable(),
  categoryId: z.string().optional().nullable()
}).strict();

export const CategoryCreateManyUserInputSchema: z.ZodType<Prisma.CategoryCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable()
}).strict();

export const LabelCreateManyUserInputSchema: z.ZodType<Prisma.LabelCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable()
}).strict();

export const TaskUpdateWithoutAssigneeInputSchema: z.ZodType<Prisma.TaskUpdateWithoutAssigneeInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reminder: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRecurring: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  frequency: z.union([ z.lazy(() => RecurrenceFrequencySchema),z.lazy(() => NullableEnumRecurrenceFrequencyFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interval: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.lazy(() => CategoryUpdateOneWithoutTasksNestedInputSchema).optional(),
  labels: z.lazy(() => TaskLabelUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateWithoutAssigneeInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutAssigneeInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reminder: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRecurring: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  frequency: z.union([ z.lazy(() => RecurrenceFrequencySchema),z.lazy(() => NullableEnumRecurrenceFrequencyFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interval: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  labels: z.lazy(() => TaskLabelUncheckedUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateManyWithoutAssigneeInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutAssigneeInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reminder: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRecurring: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  frequency: z.union([ z.lazy(() => RecurrenceFrequencySchema),z.lazy(() => NullableEnumRecurrenceFrequencyFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interval: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CategoryUpdateWithoutUserInputSchema: z.ZodType<Prisma.CategoryUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tasks: z.lazy(() => TaskUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LabelUpdateWithoutUserInputSchema: z.ZodType<Prisma.LabelUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tasks: z.lazy(() => TaskLabelUpdateManyWithoutLabelNestedInputSchema).optional()
}).strict();

export const LabelUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.LabelUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tasks: z.lazy(() => TaskLabelUncheckedUpdateManyWithoutLabelNestedInputSchema).optional()
}).strict();

export const LabelUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.LabelUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TaskCreateManyCategoryInputSchema: z.ZodType<Prisma.TaskCreateManyCategoryInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  status: z.lazy(() => TaskStatusSchema),
  priority: z.number().int(),
  dueDate: z.coerce.date().optional().nullable(),
  reminder: z.coerce.date().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  isRecurring: z.boolean().optional(),
  frequency: z.lazy(() => RecurrenceFrequencySchema).optional().nullable(),
  interval: z.number().int().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  completedAt: z.coerce.date().optional().nullable(),
  assigneeId: z.string().optional().nullable()
}).strict();

export const TaskUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.TaskUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reminder: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRecurring: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  frequency: z.union([ z.lazy(() => RecurrenceFrequencySchema),z.lazy(() => NullableEnumRecurrenceFrequencyFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interval: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assignee: z.lazy(() => UserUpdateOneWithoutTasksNestedInputSchema).optional(),
  labels: z.lazy(() => TaskLabelUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reminder: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRecurring: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  frequency: z.union([ z.lazy(() => RecurrenceFrequencySchema),z.lazy(() => NullableEnumRecurrenceFrequencyFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interval: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assigneeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  labels: z.lazy(() => TaskLabelUncheckedUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateManyWithoutCategoryInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutCategoryInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reminder: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRecurring: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  frequency: z.union([ z.lazy(() => RecurrenceFrequencySchema),z.lazy(() => NullableEnumRecurrenceFrequencyFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  interval: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  daysOfWeek: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  dayOfMonth: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assigneeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TaskLabelCreateManyLabelInputSchema: z.ZodType<Prisma.TaskLabelCreateManyLabelInput> = z.object({
  taskId: z.string()
}).strict();

export const TaskLabelUpdateWithoutLabelInputSchema: z.ZodType<Prisma.TaskLabelUpdateWithoutLabelInput> = z.object({
  task: z.lazy(() => TaskUpdateOneRequiredWithoutLabelsNestedInputSchema).optional()
}).strict();

export const TaskLabelUncheckedUpdateWithoutLabelInputSchema: z.ZodType<Prisma.TaskLabelUncheckedUpdateWithoutLabelInput> = z.object({
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskLabelUncheckedUpdateManyWithoutLabelInputSchema: z.ZodType<Prisma.TaskLabelUncheckedUpdateManyWithoutLabelInput> = z.object({
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const TaskFindFirstArgsSchema: z.ZodType<Prisma.TaskFindFirstArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TaskFindFirstOrThrowArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskFindManyArgsSchema: z.ZodType<Prisma.TaskFindManyArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskAggregateArgsSchema: z.ZodType<Prisma.TaskAggregateArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TaskGroupByArgsSchema: z.ZodType<Prisma.TaskGroupByArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithAggregationInputSchema.array(),TaskOrderByWithAggregationInputSchema ]).optional(),
  by: TaskScalarFieldEnumSchema.array(),
  having: TaskScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TaskFindUniqueArgsSchema: z.ZodType<Prisma.TaskFindUniqueArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const TaskFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TaskFindUniqueOrThrowArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const CategoryFindFirstArgsSchema: z.ZodType<Prisma.CategoryFindFirstArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CategoryFindFirstOrThrowArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryFindManyArgsSchema: z.ZodType<Prisma.CategoryFindManyArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryAggregateArgsSchema: z.ZodType<Prisma.CategoryAggregateArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoryGroupByArgsSchema: z.ZodType<Prisma.CategoryGroupByArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithAggregationInputSchema.array(),CategoryOrderByWithAggregationInputSchema ]).optional(),
  by: CategoryScalarFieldEnumSchema.array(),
  having: CategoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoryFindUniqueArgsSchema: z.ZodType<Prisma.CategoryFindUniqueArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CategoryFindUniqueOrThrowArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const LabelFindFirstArgsSchema: z.ZodType<Prisma.LabelFindFirstArgs> = z.object({
  select: LabelSelectSchema.optional(),
  include: LabelIncludeSchema.optional(),
  where: LabelWhereInputSchema.optional(),
  orderBy: z.union([ LabelOrderByWithRelationInputSchema.array(),LabelOrderByWithRelationInputSchema ]).optional(),
  cursor: LabelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LabelScalarFieldEnumSchema,LabelScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LabelFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LabelFindFirstOrThrowArgs> = z.object({
  select: LabelSelectSchema.optional(),
  include: LabelIncludeSchema.optional(),
  where: LabelWhereInputSchema.optional(),
  orderBy: z.union([ LabelOrderByWithRelationInputSchema.array(),LabelOrderByWithRelationInputSchema ]).optional(),
  cursor: LabelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LabelScalarFieldEnumSchema,LabelScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LabelFindManyArgsSchema: z.ZodType<Prisma.LabelFindManyArgs> = z.object({
  select: LabelSelectSchema.optional(),
  include: LabelIncludeSchema.optional(),
  where: LabelWhereInputSchema.optional(),
  orderBy: z.union([ LabelOrderByWithRelationInputSchema.array(),LabelOrderByWithRelationInputSchema ]).optional(),
  cursor: LabelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LabelScalarFieldEnumSchema,LabelScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LabelAggregateArgsSchema: z.ZodType<Prisma.LabelAggregateArgs> = z.object({
  where: LabelWhereInputSchema.optional(),
  orderBy: z.union([ LabelOrderByWithRelationInputSchema.array(),LabelOrderByWithRelationInputSchema ]).optional(),
  cursor: LabelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LabelGroupByArgsSchema: z.ZodType<Prisma.LabelGroupByArgs> = z.object({
  where: LabelWhereInputSchema.optional(),
  orderBy: z.union([ LabelOrderByWithAggregationInputSchema.array(),LabelOrderByWithAggregationInputSchema ]).optional(),
  by: LabelScalarFieldEnumSchema.array(),
  having: LabelScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LabelFindUniqueArgsSchema: z.ZodType<Prisma.LabelFindUniqueArgs> = z.object({
  select: LabelSelectSchema.optional(),
  include: LabelIncludeSchema.optional(),
  where: LabelWhereUniqueInputSchema,
}).strict() ;

export const LabelFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LabelFindUniqueOrThrowArgs> = z.object({
  select: LabelSelectSchema.optional(),
  include: LabelIncludeSchema.optional(),
  where: LabelWhereUniqueInputSchema,
}).strict() ;

export const TaskLabelFindFirstArgsSchema: z.ZodType<Prisma.TaskLabelFindFirstArgs> = z.object({
  select: TaskLabelSelectSchema.optional(),
  include: TaskLabelIncludeSchema.optional(),
  where: TaskLabelWhereInputSchema.optional(),
  orderBy: z.union([ TaskLabelOrderByWithRelationInputSchema.array(),TaskLabelOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskLabelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskLabelScalarFieldEnumSchema,TaskLabelScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskLabelFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TaskLabelFindFirstOrThrowArgs> = z.object({
  select: TaskLabelSelectSchema.optional(),
  include: TaskLabelIncludeSchema.optional(),
  where: TaskLabelWhereInputSchema.optional(),
  orderBy: z.union([ TaskLabelOrderByWithRelationInputSchema.array(),TaskLabelOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskLabelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskLabelScalarFieldEnumSchema,TaskLabelScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskLabelFindManyArgsSchema: z.ZodType<Prisma.TaskLabelFindManyArgs> = z.object({
  select: TaskLabelSelectSchema.optional(),
  include: TaskLabelIncludeSchema.optional(),
  where: TaskLabelWhereInputSchema.optional(),
  orderBy: z.union([ TaskLabelOrderByWithRelationInputSchema.array(),TaskLabelOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskLabelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskLabelScalarFieldEnumSchema,TaskLabelScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskLabelAggregateArgsSchema: z.ZodType<Prisma.TaskLabelAggregateArgs> = z.object({
  where: TaskLabelWhereInputSchema.optional(),
  orderBy: z.union([ TaskLabelOrderByWithRelationInputSchema.array(),TaskLabelOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskLabelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TaskLabelGroupByArgsSchema: z.ZodType<Prisma.TaskLabelGroupByArgs> = z.object({
  where: TaskLabelWhereInputSchema.optional(),
  orderBy: z.union([ TaskLabelOrderByWithAggregationInputSchema.array(),TaskLabelOrderByWithAggregationInputSchema ]).optional(),
  by: TaskLabelScalarFieldEnumSchema.array(),
  having: TaskLabelScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TaskLabelFindUniqueArgsSchema: z.ZodType<Prisma.TaskLabelFindUniqueArgs> = z.object({
  select: TaskLabelSelectSchema.optional(),
  include: TaskLabelIncludeSchema.optional(),
  where: TaskLabelWhereUniqueInputSchema,
}).strict() ;

export const TaskLabelFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TaskLabelFindUniqueOrThrowArgs> = z.object({
  select: TaskLabelSelectSchema.optional(),
  include: TaskLabelIncludeSchema.optional(),
  where: TaskLabelWhereUniqueInputSchema,
}).strict() ;

export const TaskCreateArgsSchema: z.ZodType<Prisma.TaskCreateArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  data: z.union([ TaskCreateInputSchema,TaskUncheckedCreateInputSchema ]),
}).strict() ;

export const TaskUpsertArgsSchema: z.ZodType<Prisma.TaskUpsertArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
  create: z.union([ TaskCreateInputSchema,TaskUncheckedCreateInputSchema ]),
  update: z.union([ TaskUpdateInputSchema,TaskUncheckedUpdateInputSchema ]),
}).strict() ;

export const TaskCreateManyArgsSchema: z.ZodType<Prisma.TaskCreateManyArgs> = z.object({
  data: z.union([ TaskCreateManyInputSchema,TaskCreateManyInputSchema.array() ]),
}).strict() ;

export const TaskCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TaskCreateManyAndReturnArgs> = z.object({
  data: z.union([ TaskCreateManyInputSchema,TaskCreateManyInputSchema.array() ]),
}).strict() ;

export const TaskDeleteArgsSchema: z.ZodType<Prisma.TaskDeleteArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const TaskUpdateArgsSchema: z.ZodType<Prisma.TaskUpdateArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  data: z.union([ TaskUpdateInputSchema,TaskUncheckedUpdateInputSchema ]),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const TaskUpdateManyArgsSchema: z.ZodType<Prisma.TaskUpdateManyArgs> = z.object({
  data: z.union([ TaskUpdateManyMutationInputSchema,TaskUncheckedUpdateManyInputSchema ]),
  where: TaskWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TaskUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TaskUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TaskUpdateManyMutationInputSchema,TaskUncheckedUpdateManyInputSchema ]),
  where: TaskWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TaskDeleteManyArgsSchema: z.ZodType<Prisma.TaskDeleteManyArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CategoryCreateArgsSchema: z.ZodType<Prisma.CategoryCreateArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  data: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
}).strict() ;

export const CategoryUpsertArgsSchema: z.ZodType<Prisma.CategoryUpsertArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
  create: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
  update: z.union([ CategoryUpdateInputSchema,CategoryUncheckedUpdateInputSchema ]),
}).strict() ;

export const CategoryCreateManyArgsSchema: z.ZodType<Prisma.CategoryCreateManyArgs> = z.object({
  data: z.union([ CategoryCreateManyInputSchema,CategoryCreateManyInputSchema.array() ]),
}).strict() ;

export const CategoryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CategoryCreateManyAndReturnArgs> = z.object({
  data: z.union([ CategoryCreateManyInputSchema,CategoryCreateManyInputSchema.array() ]),
}).strict() ;

export const CategoryDeleteArgsSchema: z.ZodType<Prisma.CategoryDeleteArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryUpdateArgsSchema: z.ZodType<Prisma.CategoryUpdateArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  data: z.union([ CategoryUpdateInputSchema,CategoryUncheckedUpdateInputSchema ]),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryUpdateManyArgsSchema: z.ZodType<Prisma.CategoryUpdateManyArgs> = z.object({
  data: z.union([ CategoryUpdateManyMutationInputSchema,CategoryUncheckedUpdateManyInputSchema ]),
  where: CategoryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CategoryUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CategoryUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CategoryUpdateManyMutationInputSchema,CategoryUncheckedUpdateManyInputSchema ]),
  where: CategoryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CategoryDeleteManyArgsSchema: z.ZodType<Prisma.CategoryDeleteManyArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const LabelCreateArgsSchema: z.ZodType<Prisma.LabelCreateArgs> = z.object({
  select: LabelSelectSchema.optional(),
  include: LabelIncludeSchema.optional(),
  data: z.union([ LabelCreateInputSchema,LabelUncheckedCreateInputSchema ]),
}).strict() ;

export const LabelUpsertArgsSchema: z.ZodType<Prisma.LabelUpsertArgs> = z.object({
  select: LabelSelectSchema.optional(),
  include: LabelIncludeSchema.optional(),
  where: LabelWhereUniqueInputSchema,
  create: z.union([ LabelCreateInputSchema,LabelUncheckedCreateInputSchema ]),
  update: z.union([ LabelUpdateInputSchema,LabelUncheckedUpdateInputSchema ]),
}).strict() ;

export const LabelCreateManyArgsSchema: z.ZodType<Prisma.LabelCreateManyArgs> = z.object({
  data: z.union([ LabelCreateManyInputSchema,LabelCreateManyInputSchema.array() ]),
}).strict() ;

export const LabelCreateManyAndReturnArgsSchema: z.ZodType<Prisma.LabelCreateManyAndReturnArgs> = z.object({
  data: z.union([ LabelCreateManyInputSchema,LabelCreateManyInputSchema.array() ]),
}).strict() ;

export const LabelDeleteArgsSchema: z.ZodType<Prisma.LabelDeleteArgs> = z.object({
  select: LabelSelectSchema.optional(),
  include: LabelIncludeSchema.optional(),
  where: LabelWhereUniqueInputSchema,
}).strict() ;

export const LabelUpdateArgsSchema: z.ZodType<Prisma.LabelUpdateArgs> = z.object({
  select: LabelSelectSchema.optional(),
  include: LabelIncludeSchema.optional(),
  data: z.union([ LabelUpdateInputSchema,LabelUncheckedUpdateInputSchema ]),
  where: LabelWhereUniqueInputSchema,
}).strict() ;

export const LabelUpdateManyArgsSchema: z.ZodType<Prisma.LabelUpdateManyArgs> = z.object({
  data: z.union([ LabelUpdateManyMutationInputSchema,LabelUncheckedUpdateManyInputSchema ]),
  where: LabelWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const LabelUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.LabelUpdateManyAndReturnArgs> = z.object({
  data: z.union([ LabelUpdateManyMutationInputSchema,LabelUncheckedUpdateManyInputSchema ]),
  where: LabelWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const LabelDeleteManyArgsSchema: z.ZodType<Prisma.LabelDeleteManyArgs> = z.object({
  where: LabelWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TaskLabelCreateArgsSchema: z.ZodType<Prisma.TaskLabelCreateArgs> = z.object({
  select: TaskLabelSelectSchema.optional(),
  include: TaskLabelIncludeSchema.optional(),
  data: z.union([ TaskLabelCreateInputSchema,TaskLabelUncheckedCreateInputSchema ]),
}).strict() ;

export const TaskLabelUpsertArgsSchema: z.ZodType<Prisma.TaskLabelUpsertArgs> = z.object({
  select: TaskLabelSelectSchema.optional(),
  include: TaskLabelIncludeSchema.optional(),
  where: TaskLabelWhereUniqueInputSchema,
  create: z.union([ TaskLabelCreateInputSchema,TaskLabelUncheckedCreateInputSchema ]),
  update: z.union([ TaskLabelUpdateInputSchema,TaskLabelUncheckedUpdateInputSchema ]),
}).strict() ;

export const TaskLabelCreateManyArgsSchema: z.ZodType<Prisma.TaskLabelCreateManyArgs> = z.object({
  data: z.union([ TaskLabelCreateManyInputSchema,TaskLabelCreateManyInputSchema.array() ]),
}).strict() ;

export const TaskLabelCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TaskLabelCreateManyAndReturnArgs> = z.object({
  data: z.union([ TaskLabelCreateManyInputSchema,TaskLabelCreateManyInputSchema.array() ]),
}).strict() ;

export const TaskLabelDeleteArgsSchema: z.ZodType<Prisma.TaskLabelDeleteArgs> = z.object({
  select: TaskLabelSelectSchema.optional(),
  include: TaskLabelIncludeSchema.optional(),
  where: TaskLabelWhereUniqueInputSchema,
}).strict() ;

export const TaskLabelUpdateArgsSchema: z.ZodType<Prisma.TaskLabelUpdateArgs> = z.object({
  select: TaskLabelSelectSchema.optional(),
  include: TaskLabelIncludeSchema.optional(),
  data: z.union([ TaskLabelUpdateInputSchema,TaskLabelUncheckedUpdateInputSchema ]),
  where: TaskLabelWhereUniqueInputSchema,
}).strict() ;

export const TaskLabelUpdateManyArgsSchema: z.ZodType<Prisma.TaskLabelUpdateManyArgs> = z.object({
  data: z.union([ TaskLabelUpdateManyMutationInputSchema,TaskLabelUncheckedUpdateManyInputSchema ]),
  where: TaskLabelWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TaskLabelUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TaskLabelUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TaskLabelUpdateManyMutationInputSchema,TaskLabelUncheckedUpdateManyInputSchema ]),
  where: TaskLabelWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TaskLabelDeleteManyArgsSchema: z.ZodType<Prisma.TaskLabelDeleteManyArgs> = z.object({
  where: TaskLabelWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;