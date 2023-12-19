type Indexable = string | number | symbol;
type CaseHandlerFunction<Case, R> = (c: Case) => R;
type Ret<Case extends Indexable, R> = R | CaseHandlerFunction<Case, R>;
type CaseRecord<Case extends Indexable, R> = Record<Case, Ret<Case, R>>;
type Cases<Case extends Indexable, R> =
  | CaseRecord<Case, R>
  | (Partial<CaseRecord<Case, R>> & { else: Ret<Case, R> });

/**
 * switch-case like function that does not fall through and returns the case result.
 * It is typesafe and demands exhaustive case handling.
 * However, (as switch-case) it can only handle cases, that can be used as an index.
 * exemplary usage:
 * <pre>
 * function foo(a: 1 | 2 | 3): number {
 *     return when(a)({
 *         1: 1,
 *         2: () => 2,
 *         else: (b) => b,
 *     })
 * }
 * </pre>
 */
export function when<Case extends string | number | symbol>(
  c: Case,
): <Ret>(cases: Cases<Case, Ret>) => Ret {
  return function <R>(cases: Cases<Case, R>): R {
    const handler: Ret<Case, R> =
      c in cases ? cases[c] : (cases as any)["else"];
    if (typeof handler === "function") {
      return (handler as CaseHandlerFunction<Case, R>)(c);
    } else {
      return handler;
    }
  };
}
