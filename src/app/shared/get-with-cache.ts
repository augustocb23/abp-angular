import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 *  Gets an item and stores it in a dictionary.
 *
 * @param getter Observable to get the value.
 * @param map Dictionary where the result will be saved.
 * @param key Dictionary key of the object.
 */
export const getWithCache = <T, TKey = any>(
  getter: Observable<T>,
  map: NonNullable<Map<TKey, Observable<T>>>,
  key: TKey): Observable<T> => {
  if (!key) {
    return of(null);
  }

  if (!map.has(key)) {
    const subject = new Subject<T>();
    map.set(key, subject.asObservable());

    getter
      .pipe(catchError(err => {
        map.delete(key);
        throw err;
      }))
      .subscribe(data => {
        map.set(key, of(data));
        subject.next(data);
        subject.complete();
      });
  }

  return map.get(key);
};
